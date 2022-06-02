import classNames from "classnames";
import React from "react";
import style from "./icon.module.sass";
import { IconType } from "./iconCommonDefinition";

export interface IconProps {
  name: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: IconType;
  stopClickPropagation?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, onClick, type = IconType.Regular, className, stopClickPropagation = false }) => {
  const finalClassName = classNames([type, className, style.icon, `fa-${name}`]);

  return (
    <i
      className={finalClassName}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        stopClickPropagation && e.stopPropagation();
        onClick && onClick(e);
      }}
    />
  );
};

export default Icon;
