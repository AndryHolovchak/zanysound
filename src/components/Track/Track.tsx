import classNames from "classnames";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { PlaylistModel, TrackModel } from "../../commonTypes/deezerTypes";
import { addToPlaylistAction, removeFromPlaylistAction } from "../../sagas/contentSaga";
import { retrieveMp3UrlAction } from "../../sagas/mp3Saga";
import { addTrackToLikedAction, removeTrackFromLikedAction } from "../../sagas/userSaga";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import { AddToPlaylistModal } from "../AddToPlaylistModal/AddToPlaylistModal";
import { PopupMenu } from "../PopupMenu/PopupMenu";
import style from "./track.module.sass";
import { PopupMenuItem } from "../PopupMenu/static/popupMenuTypes";
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
