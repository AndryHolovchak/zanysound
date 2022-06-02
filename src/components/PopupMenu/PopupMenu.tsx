import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../Icon/Icon";
import style from "./PopupMenu.module.sass";
import { PopupMenuItem } from "./static/popupMenuTypes";

export interface PopupMenuProps {
  className?: string;
  items: PopupMenuItem[];
}

export const PopupMenu = ({ className, items }: PopupMenuProps) => {
  const renderItem = (item: PopupMenuItem, index: number) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      item.onClick();
    };

    return (
      <div key={index} className={style.popup_menu__item} onClick={handleClick}>
        <Icon name={item.iconName} className={classNames([style.popup_menu__item_icon, item.iconClassName])} />
        <span className={classNames([style.popup_menu__item_text, item.textClassName])}>{item.text}</span>
      </div>
    );
  };

  return (
    <div className={classNames([style.popup_menu, className])}>
      <Icon stopClickPropagation name="ellipsis-v" className={style.popup_menu__icon} />
      <div className={style.popup_menu__items}>{items.map(renderItem)}</div>
    </div>
  );
};
