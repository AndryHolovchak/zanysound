import React from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { Routes } from "../../../commonDefinitions/routeCommonDefinitions";

import Icon from "../../Icon/Icon";
import "../../../assets/fonts/fontawesome/css//all.min.css";
import style from "./desktopMenu.module.sass";

const DesktopMenu: React.FC = () => {
  return (
    <div className={style.desktop_menu}>
      <MenuItem path={Routes.Collection} icon="album-collection" title="Playlists" />
      <MenuItem path={Routes.Search} icon="search" title="Search" />
      <MenuItem path={Routes.Liked} icon="heart" title="Liked" />
      <MenuItem path={Routes.Recommended} icon="fire" title="Recommended" />
      <MenuItem path={Routes.Profile} icon="user" title="Profile" />
    </div>
  );
};

interface MenuItemProps {
  path: string;
  icon: string;
  title: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ path, title, icon }) => {
  const location = useLocation();
  const history = useHistory();

  const className = classNames([style.desktop_menu__item, { [style["desktop_menu__item--active"]]: location.pathname === path }]);

  return (
    <div className={className} onClick={() => history.push(path)}>
      <Icon name={icon} className={style.desktop_menu__item_icon} />
      <span>{title}</span>
    </div>
  );
};

export default DesktopMenu;
