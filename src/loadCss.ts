import { useEffect, useGlobals, useParameter } from "storybook/internal/preview-api";
import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";

import { DEFAULT_STYLES, KEY } from "./constants";
import { Config, Css } from './types';

export const loadCss = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const [globals] = useGlobals();
  const config = useParameter<Config>(KEY);
  const { options = DEFAULT_STYLES } = config || {};
  let cssToLoad: Css;


  if (globals[KEY] && globals[KEY].value && options[globals[KEY].value]) {
    // css is set in globoals
    cssToLoad = options[globals[KEY].value];
  }

  if (!cssToLoad) {
    // if nothing set, default take the first item
    cssToLoad = options[Object.keys(options)[0]];
  }

  const canvas = context.canvasElement as ParentNode;

  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  useEffect(() => {
    if (!isInDocs) {
      addStylesheetElement(canvas, cssToLoad);
    }
  }, [cssToLoad, isInDocs]);

  return StoryFn();
};

/**
 * This will handle the right <link> element to be present in the iframes  header
 */
function addStylesheetElement(canvas: ParentNode, cssToLoad: Css) {

  (canvas as HTMLElement).style.background = cssToLoad.backgroundColor;

  const head = canvas?.ownerDocument?.head;
  if (head) {
    // search for previously appended css and remove it
    const previousCssLinkEl = head.querySelector('#storybook-addon-cssswitch');
    if (previousCssLinkEl) {
      previousCssLinkEl.parentNode.removeChild(previousCssLinkEl);
    }

    // append the new css
    const link = document.createElement('link');
    link.id = 'storybook-addon-cssswitch';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssToLoad.value;
    link.media = 'all';
    head.appendChild(link);
  }
}
