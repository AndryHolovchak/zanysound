import classNames from "classnames";
import React from "react";
import style from "./icon.module.sass";
import { IconType } from "./iconCommonDefinition";

export interface IconProps {
  name: string;
  title?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: IconType;
}

const Icon: React.FC<IconProps> = ({ name, onClick, type = IconType.Regular, title = "", className = "" }) => {
  const finalClassName = classNames([type, className, style.icon, `fa-${name}`]);

  return <i title={title} className={finalClassName} onClick={onClick} />;
};

export default Icon;
