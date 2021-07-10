import classNames from "classnames";
import React from "react";
import style from "./icon.module.sass";
import { IconRotation, IconType } from "./iconCommonDefinition";

export interface IconProps {
  name: string;
  title?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: IconType;
  rotation?: IconRotation;
  fixedWidth?: boolean;
  withBackground?: boolean;
}

const Icon: React.FC<IconProps> = ({
  name,
  onClick,
  type = IconType.Regular,
  rotation = "",
  fixedWidth = false,
  withBackground = false,
  title = "",
  className = "",
}) => {
  const finalClassName = classNames([
    type,
    rotation,
    className,
    style.icon,
    `fa-${name}`,
    fixedWidth && "fa-fw",
    withBackground && style["icon--with_bg"],
  ]);

  return <i title={title} className={finalClassName} onClick={onClick} />;
};

export default Icon;
