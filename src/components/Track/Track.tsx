import classNames from "classnames";
import React from "react";
import { TrackModel } from "../../commonTypes/deezerTypes";
import style from "./track.module.sass";

export interface TrackProps {
  model: TrackModel;
  className?: string;
}

const Track: React.FC<TrackProps> = ({ model, className }) => {
  const finalClassName = classNames([style.track, className]);

  return (
    <div className={finalClassName}>
      <img alt="cover" src={model.album.cover} className={style.track__cover} />
      <div className={style.track__main_info}>
        <span className={style.track__title}>{model.title}</span>
        <span className={style.track__artist}>{model.artist.name}</span>
      </div>
    </div>
  );
};

export default Track;
