// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sanity from '@sanity/astro';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: 'bn4rvp7h',
      dataset: 'production',
      useCdn: false, // Si es estático va false. Si es dinámico va true 
      apiVersion: "2025-03-29", 
      studioBasePath: '/studio' // De esta manera integramos Sanity Studio a una ruta de Astro
    }),
    react()
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined
      
    },
  },
  experimental: {
    session: true
  }
});