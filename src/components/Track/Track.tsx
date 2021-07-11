import classNames from "classnames";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { TrackModel } from "../../commonTypes/deezerTypes";
import { generateMp3Url } from "../../sagas/mp3Saga";
import style from "./track.module.sass";

export interface TrackProps {
  model: TrackModel;
  className?: string;
}

const Track: React.FC<TrackProps> = ({ model, className }) => {
  const dispatch = useAppDispatch();
  const finalClassName = classNames([style.track, className]);

  return (
    <div
      className={finalClassName}
      onClick={() => {
        dispatch(
          generateMp3Url({
            title: model.title,
            artist: model.title,
            trackId: model.id,
          })
        );
      }}
    >
      <img alt="cover" src={model.album.cover} className={style.track__cover} />
      <div className={style.track__main_info}>
        <span className={style.track__title}>{model.title}</span>
        <span className={style.track__artist}>{model.artist.name}</span>
      </div>
    </div>
  );
};

export default Track;
