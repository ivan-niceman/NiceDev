import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nice-dev.ru',

  adapter: node({
    mode: 'standalone',
  }),

  output: 'static',

  build: {
    format: 'directory',
  },

  integrations: [sitemap()],
});