import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationType } from "../../commonDefinitions/miscCommonDefinitions";
import { Playlists } from "../../commonTypes/miscTypes";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import { Input } from "../../components/Input/Input";
import { Modal } from "../../components/Modal/Modal";
import { PlaylistPreview } from "../../components/PlaylistPreview/PlaylistPreview";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { createNewPlaylistAction } from "../../sagas/contentSaga";
import { selectPlaylists } from "../../slices/contentSlice";
import { addNotification } from "../../slices/notificationSlice";
import { createNotificationItem } from "../../utils/common";
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
          <div className={styles.collection_screen__new_button_icon_container}>
            <Icon name="plus" className={styles.collection_screen__new_button_icon} />
          </div>
          <div className={styles.collection_screen__new_button_right_side}>
            <span className={styles.collection_screen__new_button_text}>Create new playlist</span>
          </div>
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
      dispatch(addNotification(createNotificationItem(NotificationType.Success, "Playlist created")));
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.new_playlist_modal}>
        <Input placeholder="Title" value={title} onChange={setTitle} className={styles.new_playlist_modal__input} />
        <Button
          disabled={title.length === 0}
          title="Create"
          onCLick={handleButtonClick}
          className={styles.new_playlist_modal__button}
        />
      </div>
    </Modal>
  );
};
