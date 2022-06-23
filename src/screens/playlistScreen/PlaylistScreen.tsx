import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EllipsisText } from "../../components/EllipsisText/EllipsisText";
import Icon from "../../components/Icon/Icon";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { loadPlaylistTracksAction } from "../../sagas/contentSaga";
import { selectPlaylists, selectPlaylistsTracks } from "../../slices/contentSlice";
import styles from "./PlaylistScreen.module.sass";

export const PlaylistScreen = () => {
  const { id } = useParams<any>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const playlists = useAppSelector(selectPlaylists);
  const playlistsTracks = useAppSelector(selectPlaylistsTracks);

  useEffect(() => {
    dispatch(loadPlaylistTracksAction({ playlistId: id }));
  }, [id]);

  const targetTracks = playlistsTracks[id];
  const targetPlaylist = playlists[id];

  if (!targetPlaylist) {
    return <></>;
  }

  const handleBackIconClick = () => history.goBack();

  return (
    <ScreenContainer>
      <div className={styles.playlist_screen}>
        <div className={styles.playlist_screen__head}>
          <div className={styles.playlist_screen__head_icon_container} onClick={handleBackIconClick}>
            <Icon name="arrow-left" className={styles.playlist_screen__head_icon} />
          </div>
          <EllipsisText
            value={targetPlaylist.title}
            className={styles.playlist_screen__head_title}
            containerClassName={styles.playlist_screen__head_title_container}
          />
        </div>
        <Tracklist
          tracks={targetTracks || []}
          id={id}
          parentPlaylist={targetPlaylist}
          className={styles.playlist_screen__tracklist}
        />
      </div>
    </ScreenContainer>
  );
};
