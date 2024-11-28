import { CssMap } from './types';

export const ADDON_ID = "cssswitch";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const KEY = `cssswitch`;

// just to have something if no options given - we don't want to crash
export const DEFAULT_STYLES: CssMap = {
  light: { name: 'light', value: 'variables_light.css', color: 'white' },
  dark: { name: 'dark', value: 'variables_dark.css', color: 'black' },
}