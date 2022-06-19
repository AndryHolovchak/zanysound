import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import { addToPlaylistAction } from "../../sagas/contentSaga";
import { selectPlaylists } from "../../slices/contentSlice";
import { sortPlaylistsByDate } from "../../utils/sortingUtils";
import { Modal } from "../Modal/Modal";
import style from "./AddToPlaylistModal.module.sass";

export interface AddToPlaylistModalProps {
  trackId: string;
  onClose: () => void;
}

export const AddToPlaylistModal = ({ trackId, onClose }: AddToPlaylistModalProps) => {
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
          <ModalItem key={playlist.id} playlist={playlist} onClick={() => handlePlaylistClick(playlist)} />
        ))}
      </div>
    </Modal>
  );
};

interface ModalItemProps {
  playlist: PlaylistModel;
  onClick: () => void;
}

const ModalItem = ({ playlist, onClick }: ModalItemProps) => {
  return (
    <div className={style.modal_item} onClick={onClick}>
      <img src={playlist.xlPicture} className={style.modal_item__cover} />
      <span className={style.modal_item__title}>{playlist.title}</span>
    </div>
  );
};
