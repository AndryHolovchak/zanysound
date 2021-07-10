import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectIsMobileEnv } from "../../appSlice";

import DesktopMenu from "../Menu/desktop/DesktopMenu";
import MobileMenu from "../Menu/mobile/MobileMenu";

import style from "./screenContainer.module.sass";

export interface ScreenContainerProps {
  withMenu?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  withMenu = true,
}) => {
  const isMobile = useAppSelector(selectIsMobileEnv);

  return (
    <div className={style.screen_container}>
      {withMenu && !isMobile && (
        <div className={style.screen_container__desktop_menu_container}>
          <DesktopMenu />
        </div>
      )}
      <div className={style.screen_container__right_side}>
        <div className={style.screen_container__screen}>{children}</div>
        {withMenu && isMobile && (
          <div className={style.screen_container__mobile_menu_container}>
            <MobileMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenContainer;
