import React from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../commonDefinitions/routeCommonDefinitions";

import Icon from "../Icon/Icon";
import "../../assets/fonts/fontawesome/css/all.min.css";
import style from "./mobileMenu.module.sass";

const MobileMenu: React.FC = () => {
  return (
    <div className={style.mobile_menu}>
      <MenuItem path={Routes.Collection} icon="album-collection" />
      <MenuItem path={Routes.Search} icon="search" />
      <MenuItem path={Routes.Liked} icon="heart" />
      <MenuItem path={Routes.Recommended} icon="fire" />
      <MenuItem path={Routes.Profile} icon="user" />
    </div>
  );
};

interface MenuItemProps {
  path: string;
  icon: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ path, icon }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const className = classNames([
    style.mobile_menu__item,
    { [style["mobile_menu__item--active"]]: location.pathname === path },
  ]);

  return (
    <div className={className} onClick={() => navigate(path)}>
      <Icon name={icon} className={style.mobile_menu__item_icon} />
    </div>
  );
};

export default MobileMenu;
