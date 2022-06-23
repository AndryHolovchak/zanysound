import React from "react";
import styles from "./DesktopScreen.module.sass";

export const DesktopScreen = () => {
  return (
    <div className={styles.desktop_screen}>
      <span className={styles.desktop_screen__text}>Desktop version is not available</span>
    </div>
  );
};
