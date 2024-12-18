
export interface Css {
  name: string;
  value: string;
  backgroundColor: string;
  iconColor?: string;
}

export type CssMap = Record<string, Css>;

export interface Config {
  options: CssMap;
}

export type GlobalState = { value: string | undefined; grid: boolean };
export type GlobalStateUpdate = Partial<GlobalState>;