import classNames from "classnames";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { PlaylistModel, TrackModel } from "../../commonTypes/deezerTypes";
import { addToPlaylistAction, removeFromPlaylistAction } from "../../sagas/contentSaga";
import { retrieveMp3UrlAction } from "../../sagas/mp3Saga";
import { addTrackToLikedAction, removeTrackFromLikedAction } from "../../sagas/userSaga";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import { AddToPlaylistModa } from "../AddToPlaylistModal/AddToPlaylistModal";
import { PopupMenu } from "../PopupMenu/PopupMenu";
import style from "./track.module.sass";
import { PopupMenuItem } from "../PopupMenu/static/popupMenuTypes";

export interface TrackProps {
  model: TrackModel;
  liked: boolean;
  playing: boolean;
  className?: string;
  onClick?: () => void;
  parentPlaylist?: PlaylistModel;
}

const Track: React.FC<TrackProps> = ({ model, liked, playing, className, onClick, parentPlaylist }) => {
  const dispatch = useAppDispatch();

  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);

  const finalClassName = classNames([style.track, className, playing && style["track--playing"]]);

  const handleLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    if (liked) {
      dispatch(removeTrackFromLikedAction({ track: model }));
    } else {
      dispatch(addTrackToLikedAction({ track: model }));
    }
  };

  const generatePopupMenuItems = () => {
    const items: PopupMenuItem[] = [
      {
        text: "Add to playlist",
        iconName: "plus",
        onClick: () => setShowPlaylistsModal(true),
      },
    ];

    if (parentPlaylist) {
      items.push({
        text: "Remove from playlist",
        iconName: "minus",
        textClassName: style.track__popup_item_delete_text,
        iconClassName: style.track__popup_item_delete_icon,
        onClick: () => dispatch(removeFromPlaylistAction({ trackId: model.id, playlistId: parentPlaylist.id })),
      });
    }
    return items;
  };

  return (
    <div className={finalClassName} onClick={onClick}>
      <img alt="cover" src={model.album.cover} className={style.track__cover} />
      <div className={style.track__main_info}>
        <span className={style.track__title}>{model.title}</span>
        <span className={style.track__artist}>{model.artist.name}</span>
      </div>
      <Icon
        stopClickPropagation
        name="heart"
        type={liked ? IconType.Solid : IconType.Light}
        className={style.track__like}
        onClick={handleLikeClick}
      />
      <PopupMenu className={style.track__popup_menu} items={generatePopupMenuItems()} />
      {showPlaylistsModal && <AddToPlaylistModa onClose={() => setShowPlaylistsModal(false)} trackId={model.id} />}
    </div>
  );
};

export default Track;
