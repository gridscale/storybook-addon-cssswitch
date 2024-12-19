import React, { memo, useCallback, useEffect, Fragment, useState } from "react";
import { useGlobals, useParameter, type API } from "storybook/internal/manager-api";
import { IconButton, TooltipLinkList, WithTooltip } from "storybook/internal/components";
import { DEFAULT_STYLES, KEY } from "../constants";
import { CircleIcon, SunIcon } from "@storybook/icons";
import { Config, Css, CssMap, GlobalStateUpdate } from './../types';



type Link = Parameters<typeof TooltipLinkList>['0']['links'][0];

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const config = useParameter<Config>(KEY);
  const { options = DEFAULT_STYLES } = config || {};
  const [globals, updateGlobals, storyGlobals] = useGlobals();

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const data = globals[KEY] || options[Object.keys(options)[0]];
  const cssName: string = data.value;

  const item: Css = options[cssName];
  const isLocked = !!storyGlobals?.[KEY];
  const length = Object.keys(options).length;


  return (
    <Pure
      {...{
        length,
        cssMap: options,
        item,
        updateGlobals,
        cssName,
        setIsTooltipVisible,
        isLocked,
        isTooltipVisible,
      }}
    />
  );
});


  interface PureProps {
    length: number;
    cssMap: CssMap;
    item: Css | undefined;
    updateGlobals: ReturnType<typeof useGlobals>['1'];
    cssName: string | undefined;
    setIsTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isLocked: boolean;
    isTooltipVisible: boolean;
  };

  const Pure = memo(function PureTool(props: PureProps) {
  const {
    item,
    length,
    updateGlobals,
    setIsTooltipVisible,
    cssMap,
    cssName,
    isLocked,
    isTooltipVisible,
  } = props;

  const update = useCallback(
    (input: GlobalStateUpdate) => {
      updateGlobals({
        [KEY]: input,
      });
    },
    [updateGlobals]
  );

  return (
    <Fragment>
      {length > 0 ? (
        <WithTooltip
          key="css"
          placement="top"
          closeOnOutsideClick
          tooltip={({ onHide }) => {
            return (
              <TooltipLinkList
                links={[
                  ...Object.entries(cssMap).map<Link>(([k, value]) => ({
                    id: k,
                    title: value.name,
                    icon: <CircleIcon color={value?.iconColor || value?.backgroundColor || 'grey'} />,
                    active: k === cssName,
                    onClick: () => {
                      update({ value: k });
                      onHide();
                    },
                  })),
                ].flat()}
              />
            );
          }}
          onVisibleChange={setIsTooltipVisible}
        >
          <IconButton
            disabled={isLocked}
            key="css"
            title="Switch CSS"
            active={!!item || isTooltipVisible}
          >
            <SunIcon />
          </IconButton>
        </WithTooltip>
      ) : null}
    </Fragment>
  );
});
