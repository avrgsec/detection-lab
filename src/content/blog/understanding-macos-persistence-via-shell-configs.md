---
title: "Understanding and detecting macOS Persistence via Shell Configuration Files"
description: "The first in a series of blog posts discussing why it's important to think like an attacker."
date: 2025-11-22
tags: ["macos", "persistence", "detection-engineering", "shell", "zshrc"]
draft: false
---
I've been really honing in on macOS detection techniques recently. Although there is decent coverage on SigmaHQ, it's not very often that I come across detection techniques solely based on macOS, and I find this surprising because it's one of the most commonly used Operating Systems in the corporate world and probably even more so when it comes to people's personal devices (No idea though I don't have stats).

Todays post is going to be focused specifically on how attackers and malware utilise shell configuration files for persistence and exfiltration, and some of the things that we as defenders can do to detect this behaviour.

The `.zshrc` file is a common and often utilised persistence and exfiltration mechanism on macOS. It executes every time a user opens a terminal and can be heavily modified based on a users personal preference. This execution can occur many times per day, especially for developers and power users. This makes it an attractive target for attackers seeking reliable, stealthy persistence and exfiltration.

--------
### Threat Landscape

#### **XCSSET**

Microsoft's Security blog from March 2025 describes a new XCSSET variant that utilises the `~/.zshrc_aliases` file to ensure that `.zshrc` sources the malicious shell on startup. This highlights the focus on Developers which in many cases, could provide attackers with immediate elevated privileges. 

Reference: https://www.microsoft.com/en-us/security/blog/2025/03/11/new-xcsset-malware-adds-new-obfuscation-persistence-techniques-to-infect-xcode-projects

#### **BlueNoroff / DPRK-Linked APT**
SentinelOne reported in November 2024 that Crypto-Currency organisations were being targeted by a North Korean APT known as BlueNoroff. It was found that BlueNoroff were utilising `~./zshenv` for persistence. Zshenv is one of several optional configuration files used by the Zsh shell. At the user level, it sits as a hidden file in the Home directory, `~/.zshenv`. A system wide version can also be located at `/etc/zshenv`. If it exists, the file is sourced for all Zsh sessions, including interactive and non-interactive shells, non-login shells and scripts. It is also read before all other Zsh startup files.

Reference: https://www.sentinelone.com/labs/bluenoroff-hidden-risk-threat-actor-targets-macs-with-fake-crypto-news-and-novel-persistence

#### **General Use**
A broader threat-intel report from **Recorded Future** (CTA-2025) notes an increasing number of macOS threat actors, but doesn’t specifically list many abusing zshrc/env.

https://go.recordedfuture.com/hubfs/reports/cta-2025-0128.pdf

-----
### Points of note

When moving through the detection lifecycle, it's important to validate the detection, ensuring it's as high fidelity as possible, and that it only fires on the activity you're trying to identify. Ideally, in a production environment, you will have separate test networks that enable you to emulate attacker activity, test detections and the facilities to tune benign behaviour to ensure that you're only pushing polished detections so not to overload the SOC (or whatever you call it) however, this is not always the case. The good thing about macOS (and any OS for that matter) is that you can easily run benign commands on your own endpoint to emulate the behaviour of an attacker, without doing anything that compromises the security of the system itself. All of the below detections will have a 'validation test' section that can be performed directly on an endpoint.

Obviously, in a production environment, you may have multiple security controls including EDR Systems, HIDS, Firewalls ect. Ensure you have approval and are aware that these commands will very likely trigger existing detections due to the nature of what we're doing. 

So on that note. Let's get to it.

-----

### Suspicious Process Modifying `.zshrc` Configuration
Typically, we'd only see modifications to the `.zshrc` file by legitimate installers, scripts, and text editors like (but not limited to) brew, oh-my-zsh, Vim, Vi, Nano and VS-Code. Of course, there are many legitimate use-cases that will require the modification of `.zshrc` however these are worth investigating and must be tuned as necessary. Our objective is not to ensure that our detection never fires, it's to generate worthy investigations into events that COULD be malicious.

```yaml
title: Suspicious Process Modifying .zshrc Configuration
id: 7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d
status: experimental
description: |
  Detects modification of the .zshrc shell configuration file by abnormal  processes.
  Attackers commonly modify .zshrc to establish persistence, execute malicious code on
  terminal launch, or exfiltrate sensitive data. This detection focuses on modifications
  made by non-standard editors or processes executing from temporary directories.
references:
  - https://attack.mitre.org/techniques/T1546/004/
  - https://www.sentinelone.com/labs/bluenoroff-hidden-risk-threat-actor-targets-macs-with-fake-crypto-news-and-novel-persistence/
author: Chris S (avrgsec_)
date: "2025-11-13"
tags:
  - attack.t1546.004
  - attack.persistence
  - attack.t1059.004
  - attack.execution
logsource:
  category: file_event
  product: macos
detection:
  selection:
    TargetFilename|endswith: '/.zshrc'
  filter_legit_editors:
    Image|endswith:
      - '/vim'
      - '/vi'
      - '/nano'
      - '/emacs'
      - '/code'
      - '/TextEdit'
      - '/Visual Studio Code'
  filter_package_managers:
    Image|contains:
      - '/brew'
      - '/oh-my-zsh'
  suspicious_paths:
    Image|startswith:
      - '/tmp/'
      - '/private/tmp/'
      - '/var/tmp/'
      - '/private/var/tmp/'
      - '/dev/shm/'
      - '/Users/*/Downloads/' # Use with caution - may generate FPs
      - '/Users/*/Desktop/' # Use with caution - may generate FPs
  condition: selection and not filter_legit_editors and not filter_package_managers or (selection and suspicious_paths)
falsepositives:
  - Legitimate shell customisation by users
  - Package manager installations (Homebrew, oh-my-zsh)
  - Automated configuration management tools
  - Environment setup scripts
  - Legitimate binaries/scripts in /Downloads/ (Use this with caution that it may generate multiple FP's)
level: high
```
Validation Test:
```bash
echo "# test modification from tmp" >> ~/.zshrc && /bin/bash -c 'echo "# malicious" >> ~/.zshrc'
```

-----
### Suspicious Network Connection from Shell Launch

Thinking logically and following on from the above detection, if an attacker was able to gain access to the `.zshrc` file, what might they want to do other than maintain persistence. We might think about things like Lateral Movement, Privilege Escalation, C2 Communications and Exfiltration. Following the modification of `.zshrc`, the attempt to initiate network connections are most often made by native and common tools such as (but not limited to) Curl, wget, NetCat, Python and openssl which can be automated when a shell is launched either manually, on startup, or any other automated process.

```yaml
title: Suspicious Network Connection from Shell Launch
id: 2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e
status: experimental
description: |
  Detects network connections initiated immediately after shell launch.
  When a terminal opens, the shell RC file (.zshrc) is executed. Attackers may abuse this to beacon to command and control servers, exfiltrate data and credentials (keychain files for example), or download 
  additional payloads. This detection identifies suspicious network tools, launched directly from the shell.
references:
  - https://attack.mitre.org/techniques/T1041/
  - https://attack.mitre.org/techniques/T1071/001/
author: Chris S (avrgsec_)
date: "2025-11-15"
tags:
  - attack.t1041
  - attack.exfiltration
  - attack.t1071.001
  - attack.command_and_control
  - attack.t1546.004
  - attack.persistence
logsource:
  category: process_creation
  product: macos
detection:
  selection_parent:
    ParentImage|endswith: 
      - '/zsh'
      - '/bash'
  selection_network_tools:
    Image|endswith:
      - '/curl'
      - '/wget'
      - '/nc'
      - '/ncat'
      - '/python'
      - '/python3'
      - '/perl'
      - '/ruby'
      - '/openssl'
  selection_indicators:
    CommandLine|contains:
      - 'http://'
      - 'https://'
      - '/dev/tcp/'
      - 'base64'
      - 'exec'
      - 'socket'
  filter_legit:
    CommandLine|contains:
      - 'brew.sh'
      - 'githubusercontent.com'
      - 'oh-my-zsh'
      - 'github.com/ohmyzsh'
      - 'github.com/robbyrussell'
      - 'update_terminal'
  condition: selection_parent and selection_network_tools and selection_indicators and not filter_legit
falsepositives:
  - homebreww installation or updates
  - oh-my-zsh updates or installations
  - Legitimate shell customisation that checks for updates
  - Development environment initialization (nvm, rbenv, pyenv)
level: high
```

Validation test:
```bash
echo 'curl -s https://example.com &' >> ~/.zshrc && zsh -c 'exit'
```

-----
### Potential Credential Exfiltration via Shell Configuration

This kind of activity has been observed in multiple breaches and I have personal experience with identifying this kind of Threat Actor behaviour during Red Team Engagements. The exfiltration of credentials is a lot of the time, the ultimate goal of an adversary. If successful, an attacker can obtain multiple credentials over various applications which massively increases their attack surface and basically provides Initial Access on any given platform. In any modern organisation with basic Endpoint Detection & Response capabilities, this behaviour would likely be alerted on, but it's absolutely worth covering whilst we're on the topic of shell config files. I've covered Keychain files in other detections on the site as well.

[Suspicious Keychain Access via security Utility](https://avrgsec.me/detections/macos/suspicious_keychain_access_via_security_utility/)  
[Keychain DB Staging for Exfiltration](https://avrgsec.me/detections/macos/keychain_db_staging_for_exfiltration/)

```yaml
title: Potential Credential Exfiltration via Shell Configuration
id: 4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a
status: stable
description: |
  Detects processes spawned from shell initialisation that access sensitive credential files.
  Attackers use .zshrc to automatically search for and exfiltrate SSH keys, AWS credentials,
  API tokens, keychain databases, and other sensitive authentication materials when a terminal 
  is opened. This detection identifies suspicious file access patterns combined with 
  credential-related commands.
references:
  - https://attack.mitre.org/techniques/T1552/001/
  - https://attack.mitre.org/techniques/T1552/004/
  - https://attack.mitre.org/techniques/T1555/001/
  - https://avrgsec.me/detections/macos/keychain_db_staging_for_exfiltration/
  - https://avrgsec.me/detections/macos/suspicious_keychain_access_via_security_utility/
author: Chris S (avrgsec_)
date: "2025-11-13"
tags:
  - attack.t1552.001
  - attack.credential_access
  - attack.t1552.004
  - attack.t1555.001
  - attack.t1041
  - attack.exfiltration
logsource:
  category: process_creation
  product: macos
detection:
  selection_parent:
    ParentImage|endswith:
      - '/zsh'
      - '/bash'
  selection_credential_access:
    CommandLine|contains:
      - '.ssh/id_rsa'
      - '.ssh/id_ed25519'
      - '.ssh/id_ecdsa'
      - '.aws/credentials'
      - 'PRIVATE KEY'
      - '.docker/config.json'
      - '.kube/config'
      - 'token'
      - 'secret'
      - '.npmrc'
      - '.pypirc'
      - '.gitconfig'
      - 'login.keychain'
      - 'login.keychain-db'
      - '/Keychains/'
      - 'security dump-keychain'
      - 'security find-generic-password'
      - 'security find-internet-password'
  selection_tools:
    Image|endswith:
      - '/find'
      - '/grep'
      - '/cat'
      - '/tar'
      - '/zip'
      - '/curl'
      - '/scp'
      - '/base64'
      - '/security'
  filter_legit:
    CommandLine|contains:
      - '/brew'
      - '/oh-my-zsh'
      - 'update_terminal'
  condition: selection_parent and selection_credential_access and selection_tools and not filter_legit
falsepositives:
  - Legitimate backup scripts run at shell initialization
  - SSH key management tools
  - Development environment setup that configures credentials
  - Password managers accessing keychain
level: critical
```

Validation test:
```bash
echo 'cat ~/.ssh/id_rsa | base64' >> ~/.zshrc && zsh -c 'exit'
```

-----
### Wrapping up

It was a fun few days following up on something I'd be meaning to for a long time. I learnt a lot about persistence mechanics utilised by attackers to maintain access to macOS systems, and the best thing is, you can pretty much replicate all of this to any Linux based system with a few small tweaks here and there. I feel like macOs is slept on when it comes to security because people just assume that because it's a mac, it's secure. That's kind of true, but at the same time, knowledge of offensive techniques on Linux systems are much wider spread due to the common usage of Linux throughout offensive security practices. So if we can learn about it, we should!

Anyways, just my 2 cents. See you in the next one.




