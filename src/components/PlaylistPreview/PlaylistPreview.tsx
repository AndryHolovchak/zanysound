import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import { deletePlaylistAction } from "../../sagas/contentSaga";
import { EllipsisText } from "../EllipsisText/EllipsisText";
import Icon from "../Icon/Icon";
import styles from "./playlistPreview.module.sass";
import { useNavigate } from "react-router-dom";

export interface PlaylistPreviewProps {
  playlistModel: PlaylistModel;
}

export const PlaylistPreview = ({ playlistModel }: PlaylistPreviewProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${playlistModel.id}`);
  };

  const handleDeleteIconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(deletePlaylistAction({ playlistId: playlistModel.id }));
  };

  return (
    <div className={styles.playlist_preview} onClick={handleClick}>
      <img className={styles.playlist_preview__cover} src={playlistModel.xlPicture} alt="" />
      <div className={styles.playlist_preview__right_side}>
        <EllipsisText
          value={playlistModel.title}
          className={styles.playlist_preview__title}
          containerClassName={styles.playlist_preview__title_container}
        />
        <Icon name="trash" className={styles.playlist_preview__delete_icon} onClick={handleDeleteIconClick} />
      </div>
    </div>
  );
};
