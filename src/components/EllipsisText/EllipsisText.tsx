import classNames from "classnames";
import React from "react";
import styles from "./EllipsisText.module.sass";

export interface EllipsisTextProps {
  value: string;
  className?: string;
  containerClassName?: string;
}

export const EllipsisText = ({ value, className, containerClassName }: EllipsisTextProps) => {
  const finalContainerClassName = classNames([styles.ellipsis_text_container, containerClassName]);
  const finalClassName = classNames([styles.ellipsis_text, className]);

  return (
    <div className={finalContainerClassName}>
      <span className={finalClassName}>{value}</span>
    </div>
  );
};
