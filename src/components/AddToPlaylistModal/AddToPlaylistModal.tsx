import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PlaylistModel, TrackModel } from "../../commonTypes/deezerTypes";
import { addToPlaylistAction } from "../../sagas/contentSaga";
import { selectPlaylists } from "../../slices/contentSlice";
import { sortPlaylistsByDate } from "../../utils/sortingUtils";
import { Modal } from "../Modal/Modal";
import style from "./AddToPlaylistModal.module.sass";

export interface AddToPlaylistModalProps {
  trackId: string;
  onClose: () => void;
}

export const AddToPlaylistModa = ({ trackId, onClose }: AddToPlaylistModalProps) => {
  const dispatch = useAppDispatch();

  const playlistsCollection = useAppSelector(selectPlaylists);
  const playlists = Object.values(playlistsCollection).sort(sortPlaylistsByDate);

  const handlePlaylistClick = (playlist: PlaylistModel) => {
    dispatch(addToPlaylistAction({ trackId, playlistId: playlist.id }));
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={style.add_to_playlist_modal}>
        {Object.values(playlists).map((playlist) => (
          <ModalItem key={playlist.id} title={playlist.title} onClick={() => handlePlaylistClick(playlist)} />
        ))}
      </div>
    </Modal>
  );
};

interface ModalItemProps {
  title: string;
  onClick: () => void;
}

const ModalItem = ({ title, onClick }: ModalItemProps) => {
  return (
    <div className={style.modal_item} onClick={onClick}>
      <span className={style.modal_item__title}>{title}</span>
    </div>
  );
};
