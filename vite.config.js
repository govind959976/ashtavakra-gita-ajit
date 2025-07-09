import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ashtavakra Gita',
        short_name: 'AshtGita',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#222222',
        description: 'अष्टावक्र गीता पर आधारित आध्यात्मिक PWA ऐप',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '540x960',
            type: 'image/png',
          },
        ],
        launch_handler: {
          client_mode: 'focus-existing',
        },
        id: '/',
      },
    }),
  ],
});