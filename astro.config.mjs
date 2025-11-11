import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://avrgsec.github.io',
  base: '/',  // Changed this
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});