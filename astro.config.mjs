// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'bn4rvp7h',
      dataset: 'production',
      useCdn: true, // Si es estático va false. Si es dinámico va true 
      apiVersion: "2025-03-29", 
      studioBasePath: '/studio' // De esta manera integramos Sanity Studio a una ruta de Astro
    }),
    react()
  ],
  output: "server",
  adapter: cloudflare()
});