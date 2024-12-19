# CSS Switcher

The CSS switcher addon will add a button to your stories toolbar allowing you to switch CSS files during runtime. The CSS files must be loadable per HTTP during runtime, so either provide them thru a static asset directory or on a different host.
When switching the CSS files, a `<link>` tag is dynamically added/modified within the story iframe, while the CSS in the first option will be loaded by default.

## Installation

First, install the package.

```sh
npm install --save-dev @gridscale/storybook-addon-cssswitch
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-addon-cssswitch', // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The primary way to use this addon is to define the `cssswitch` parameter in the preview.ts file. In the option you define

`name` the identifier of the CSS (displayed in the dropdown)

`value` the URL of the CSS (must be available on runtime)

`backgroundColor` a background color which will be applied to the story preview when this css is loaded and is also used for the icon in the dropdown if no `iconColor` given

`iconColor` an optional icon color used for the icon in the dropdown

```js
// preview.ts


const preview: Preview = {
  parameters: {
    // [...]
    cssswitch: {
      options: {
        light: { name: 'light', value: '/assets/variables_light.css', backgroundColor: '#F8F8F8' },
        dark: { name: 'dark', value: '/assets/variables_dark.css', backgroundColor: '#080808' },
      }
    },
  },
};

export default preview;
```

