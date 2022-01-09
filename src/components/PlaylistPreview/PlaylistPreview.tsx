import React from "react";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import styles from "./playlistPreview.module.sass";

export interface PlaylistPreviewProps {
  playlistModel: PlaylistModel;
}

export const PlaylistPreview = ({ playlistModel }: PlaylistPreviewProps) => {
  return (
    <div className={styles.playlist_preview}>
      <img className={styles.playlist_preview__cover} src={playlistModel.xlPicture} alt="" />
      <div className={styles.playlist_preview__right_side}>
        <span className={styles.playlist_preview__title}>{playlistModel.title}</span>
      </div>
    </div>
  );
};
