---
title: "Part 1 - Stepping into the shoes of the attacker - From blue to red and back again"
description: "The first in a series of blog posts discussing why it's important to think like an attacker."
date: 2025-11-13
tags: ["detection-engineering", "series"]
draft: false
---
Most entry-level cyber roles teach you to read logs. That’s useful — but reading logs is not the same as _understanding_ what's behind them. To defend effectively you need to think like an attacker: map motives, identify the stages of an attack, and recognise the traces each stage leaves. This post explains why offensive-focused learning accelerates defensive skill, and gives practical, safe examples defenders can use to level up, and hopefully go on to further study!

--------
### Background

It’s 2015 - 3 a.m. on a quiet night shift. I’m working as a Junior Security Analyst, about a year into the role after nine months on the IT Helpdesk. My partner that night - let’s call him Bob - was deep in an investigation involving a series of SQL injection attempts.

I remember watching my peers work, trying to follow along. I could recognise some of the patterns that hinted at malicious activity, you know, basic stuff like suspicious queries, odd user-agents, bursts of failed requests - but at the time, I only understood part of the picture. I knew what “bad” looked like, but not _why_ it was bad.

Curious, I asked Bob to explain. He walked me through the concept: someone was attempting to manipulate database queries to extract sensitive data - admin credentials, perhaps even confidential information. If successful, they could move deeper into the network, establish persistence (for example, via reverse shell), and ultimately exfiltrate data.

That conversation planted a seed. For the next few years, I continued building my defensive skills - identifying patterns, writing detections, and learning to recognise threats through analysis and repetition. But something was missing. I understood _symptoms_ of attacks, not their _causes_.

It wasn’t until I started playing around with these concepts myself by building machines, analysing malware with MalwareUnicorn's Malware Analysis Guide, playing around with Juice-Shop, emulating attacker methodologies with Atomic Red-Team and blog posts, and utilising platforms like Hack The Box, which at the time, had only just launched, that things really started to click. Working in a safe, isolated lab environment, I finally saw how those attacker techniques played out in practice. I watched processes spawn, connections open, and telemetry shift — and for the first time, I could connect what I’d seen in logs years earlier, to real attacker behaviour. I finally understood how processes and child processes worked, and WHY this indicated bad, I understood the flow of an attack, from Initial Access through to Exfiltration. Everything just clicked. I guess it was like learning a language, once you brute force your way through the difficult concepts, it just clicks when you find something that makes sense to you.

That experience reshaped my understanding of what it means to defend effectively. It taught me that true defensive capability isn’t just about memorising patterns — it’s about understanding intent, context, and the mechanics of how attacks actually unfold.

There's a famous quote: "The best defence is a good offence". That slow burn - from seeing logs to understanding live attacker behaviour is what I want to unpack in this post. Why does offensive knowledge accelerate defensive skill, and how can defenders safely build that perspective for themselves.

-----
### Why Offensive Security isn't an Entry-Level Path

When I first started in security, “offensive” work - red teaming, penetration testing, exploit development had this almost mythical status. It was the cool stuff: hacking into systems, finding vulnerabilities, seeing how far you could get. For a lot of people starting out, it’s the end goal. But the truth is, offensive security isn’t where most of us should begin - not because it’s unachievable, but because it demands a foundation that only time and context can yield.

To understand how to break into something, you first need to understand how it’s built. You need to know how networks talk to each other, how authentication works, what logs mean, and how data moves across systems. Without that baseline, offensive concepts like privilege escalation, persistence or lateral movement feel alien - you might know the commands and what they look like, but not the consequences or how they are happening.

When I look back, I realise that struggling through those early years was critical. Working in the SOC meant seeing everything - the noise, the false positives, the 2 a.m. alerts that turned out to be misconfigurations. It taught me how fragile and complex environments can be, and it gave me an appreciation for the real-world impact of attacks beyond the lab.

Offensive Security isn’t inaccessible, but it’s also not a shortcut. It’s a discipline that builds on experience: you can’t think like an attacker until you’ve learned how defenders actually operate — how controls are deployed, how logs are generated, and how investigations unfold, and this works both ways which is a concept I think many newcomers struggle to grasp. The offensive side looks more exciting, more tangible, but without a grounding in basic networking, system administration and defence, it’s like trying to converse in a language you haven’t yet learned to speak.

----
### So where do I go from here?

If you’re early in your cyber journey and you’ve just realised that “learning offence” might be a bit further down the track - don’t stress. Everyone starts somewhere, and the goal isn’t to skip ahead, it’s to build a foundation that makes offence make sense later.

Start by mastering the environment you already have access to. Learn how your network talks. Understand what a login looks like in the logs, what do different logon ID's mean? Figure out what normal traffic feels like, because once you know normal, abnormal practically jumps out at you. That skill alone will make you invaluable in any defensive role, and then building a foundation of knowledge on how to actually perform these attacks brings it all together to make you unstoppable!

Here are a few steps that helped me:

**Get curious about the “why.”**  
Don’t just close alerts — trace them. Ask, _why did this happen?_ What caused that authentication failure, or that suspicious process tree? The deeper you chase root cause, the faster you’ll build attacker awareness.
    
**Document what you learn.**  
Keep a small logbook of interesting detections or anomalies and what triggered them. Over time, you’ll start recognising patterns - the same ones attackers rely on. Learn how to write a proper investigation report and then refer back to similar reports when you get stuck.
    
**Build a safe sandbox.**  
If you want to see how attacks actually behave, spin up a few isolated VMs or try platforms like Hack The Box, TryHackMe, or OWASP Juice Shop. Focus less on “pwn the box” and more on watching the telemetry: What logs are created? How does the system respond? What does recon look like from the blue side? To do this you can use open source tools like Security Onion, Zeek, Bro. You can even take it a step further and learn how to write SNORT rules to build your own custom detections to identify your emulated activity! 
    
**Map what you see to frameworks.**  
When you identify something interesting — say, a burst of 404s or a weird parent-child process chain — check how it aligns with MITRE. It helps you think in terms of tactics and techniques instead of one off alerts.
    
**Invest in understanding systems, not just tools.**  
Tools come and go. But if you understand how authentication works, how data flows through a web app, or what happens when a process spawns another, you’ll adapt to any new tool or framework that comes along.

At some point, things will start to click. You’ll begin recognising attack stages instinctively -recon, execution, persistence — and you’ll understand why they appear the way they do in your telemetry. That’s when the leap to offensive learning stops being abstract.

You don’t have to start on the red side to think like an attacker — you just need to start paying attention to the why behind the blue side.

In the next post, we'll dive into some basic technical details behind what an attack looks like from both perspectives, to give you an understanding as to what to look for, and also, how to emulate it yourself in your own environment!


