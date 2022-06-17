import classNames from "classnames";
import React from "react";
import styles from "./Input.module.sass";

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({ value, onChange, placeholder, className }: InputProps) => {
  const finalClassName = classNames([styles.input, className]);

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || ""}
      className={finalClassName}
    />
  );
};
