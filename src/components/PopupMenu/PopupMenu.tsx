import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import style from "./PopupMenu.module.sass";
import { PopupMenuItem } from "./static/popupMenuTypes";

export interface PopupMenuProps {
  className?: string;
  items: PopupMenuItem[];
  mainIconClassName?: string;
}

export const PopupMenu = ({ className, items, mainIconClassName }: PopupMenuProps) => {
  const [showItems, setShowItems] = useState(false);
  const itemsRef = useRef<HTMLDivElement>(null);

  //hide items on outside click
  useEffect(() => {
    if (showItems && itemsRef.current) {
      const callback = (e: MouseEvent) => setShowItems(false);
      document.addEventListener("click", callback, true);

      return () => document.removeEventListener("click", callback);
    }
  }, [showItems, itemsRef.current]);

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

  const itemsClassName = classNames([style.popup_menu__items, showItems && style["popup_menu__items--visible"]]);

  const handleIconContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowItems(!showItems);
  };

  return (
    <div className={classNames([style.popup_menu, className])}>
      <div className={style.popup_menu__dots_container} onClick={handleIconContainerClick}>
        <Icon
          stopClickPropagation={false}
          name="ellipsis-v"
          className={classNames([style.popup_menu__icon, mainIconClassName])}
        />
      </div>
      <div ref={itemsRef} className={itemsClassName}>
        {items.map(renderItem)}
      </div>
    </div>
  );
};
