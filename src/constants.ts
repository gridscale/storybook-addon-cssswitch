import { CssMap } from './types';

export const ADDON_ID = "cssswitch";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const KEY = `cssswitch`;

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
};

export const DEFAULT_STYLES: CssMap = {
  light: { name: 'light', value: 'variables_light.css', color: 'white' },
  dark: { name: 'dark', value: 'variables_dark.css', color: 'black' },
}