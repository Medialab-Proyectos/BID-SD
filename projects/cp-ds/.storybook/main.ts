import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: '@storybook/angular-vite',
  // Logos del BID servidos en /assets (el builder angular-vite ignora "assets" de angular.json).
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
  docs: { defaultName: 'Documentación' },
};
export default config;
