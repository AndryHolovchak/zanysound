import classNames from "classnames";
import React from "react";
import { PlaylistModel, TrackModel } from "../../commonTypes/deezerTypes";
import style from "./track.module.sass";
import { LikeButton } from "../LikeButton/LikeButton";
import { TrackPopupMenu } from "../TrackPopupMenu/TrackPopupMenu";
import { EllipsisText } from "../EllipsisText/EllipsisText";

export interface TrackProps {
  model: TrackModel;
  liked: boolean;
  playing: boolean;
  className?: string;
  onClick?: () => void;
  parentPlaylist?: PlaylistModel;
}

const Track: React.FC<TrackProps> = ({ model, liked, playing, className, onClick, parentPlaylist }) => {
  const finalClassName = classNames([style.track, className, playing && style["track--playing"]]);

  return (
    <div className={finalClassName} onClick={onClick}>
      <img alt="cover" src={model.album.cover} className={style.track__cover} />
      <div className={style.track__main_info}>
        <EllipsisText
          value={model.title}
          className={style.track__title}
          containerClassName={style.track__title_container}
        />
        <EllipsisText value={model.artist.name} className={style.track__artist} />
      </div>
      <LikeButton liked={liked} track={model} className={style.track__like} />
      <TrackPopupMenu trackId={model.id} playlistId={parentPlaylist?.id} className={style.track__popup_menu} />
    </div>
  );
};

export default Track;
