import classNames from "classnames";
import React from "react";
import style from "./button.module.sass";

export interface ButtonProps {
  title: string;
  className?: string;
  onCLick: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ title, className, onCLick }) => {
  const finalStyle = classNames([style.button, className]);

  return (
    <button className={finalStyle} onClick={onCLick}>
      {title}
    </button>
  );
};

export default Button;
