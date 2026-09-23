/// <reference types="vitest/config" />
/**
 * Vite configuration file.
 * This file exports the configuration for Vite, a fast build tool for modern web projects.
 *
 * @see https://vite.dev/config/ for more details on Vite configuration options.
 */

import { defineConfig } from 'vite'; // Import the `defineConfig` helper from Vite
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite"; // Import the official React plugin for Vite

// Export the Vite configuration
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => ({
  plugins: [
  // Add the React plugin to enable support for React and JSX/TSX
  react(), tailwindcss()],
  // Only use subdirectory base path in production (GitHub Pages)
  base: mode === 'production' ? '/sih-2025-one-manipur-tourism/' : '/',
  server: {
    host: true // Exposes the server on the local network
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
}));
