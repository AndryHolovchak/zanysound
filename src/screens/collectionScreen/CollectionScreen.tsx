import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import { Playlists } from "../../commonTypes/miscTypes";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import { Modal } from "../../components/Modal/Modal";
import { PlaylistPreview } from "../../components/PlaylistPreview/PlaylistPreview";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { createNewPlaylistAction } from "../../sagas/contentSaga";
import { selectPlaylists } from "../../slices/contentSlice";
import { sortPlaylistsByDate } from "../../utils/sortingUtils";
import styles from "./collectionScreen.module.sass";

export const CollectionScreen = () => {
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);
  const playlistsCollection: Playlists = useAppSelector(selectPlaylists);
  const playlists = Object.values(playlistsCollection).sort(sortPlaylistsByDate);

  return (
    <ScreenContainer>
      <div className={styles.collection_screen}>
        <div className={styles.collection_screen__new_button} onClick={() => setShowNewPlaylistModal(true)}>
          <Icon name="plus" className={styles.collection_screen__new_button_icon} />
        </div>
        {Object.entries(playlists).map((e) => (
          <PlaylistPreview key={e[0]} playlistModel={e[1]} />
        ))}
        {showNewPlaylistModal && <NewPlaylistModal onClose={() => setShowNewPlaylistModal(false)} />}
      </div>
    </ScreenContainer>
  );
};

interface NewPlaylistModalProps {
  onClose: () => void;
}

const NewPlaylistModal = ({ onClose }: NewPlaylistModalProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  const handleButtonClick = () => {
    if (title) {
      dispatch(createNewPlaylistAction({ title }));
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <input placeholder="playlist name" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button title="Create" onCLick={handleButtonClick} />
    </Modal>
  );
};
