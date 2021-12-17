import classNames from "classnames";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { TrackModel } from "../../commonTypes/deezerTypes";
import { generateMp3Url } from "../../sagas/mp3Saga";
import { addTrackToLikedAction, removeTrackFromLikedAction } from "../../sagas/userSaga";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import style from "./track.module.sass";

export interface TrackProps {
  model: TrackModel;
  liked: boolean;
  className?: string;
  onClick?: () => void;
}

const Track: React.FC<TrackProps> = ({ model, liked, className, onClick }) => {
  const dispatch = useAppDispatch();
  const finalClassName = classNames([style.track, className]);

  const handleLikeClick = () => {
    if (liked) {
      dispatch(removeTrackFromLikedAction({ track: model }));
    } else {
      dispatch(addTrackToLikedAction({ track: model }));
    }
  };

  return (
    <div className={finalClassName} onClick={onClick}>
      <img alt="cover" src={model.album.cover} className={style.track__cover} />
      <div className={style.track__main_info}>
        <span className={style.track__title}>{model.title}</span>
        <span className={style.track__artist}>{model.artist.name}</span>
      </div>
      <Icon name="heart" type={liked ? IconType.Solid : IconType.Light} className={style.track__like} onClick={handleLikeClick} />
    </div>
  );
};

export default Track;
