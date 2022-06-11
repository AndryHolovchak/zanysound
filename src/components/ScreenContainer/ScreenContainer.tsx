import classNames from "classnames";
import React, { useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import PlayerContext from "../../contexts/playerContext";
import { selectPlayerTrack } from "../../slices/playerSlice";
import MobileMenu from "../Menu/mobile/MobileMenu";
import { Player } from "../Player/Player";

import style from "./screenContainer.module.sass";

export interface ScreenContainerProps {
  withMenu?: boolean;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  const playerContext = useContext(PlayerContext);

  const contentClassName = classNames([
    style.screen_container__content,
    playerContext.track && style["screen_container__content--with-player-padding"],
  ]);

  return (
    <div className={style.screen_container}>
      <div className={contentClassName}>{children}</div>
      <div className={style.screen_container__bottom}>
        <Player />
        <MobileMenu />
      </div>
    </div>
  );
};

export default ScreenContainer;
