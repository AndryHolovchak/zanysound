import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { loadPlaylistTracksAction } from "../../sagas/contentSaga";
import { selectPlaylists, selectPlaylistsTracks } from "../../slices/contentSlice";
import styles from "./PlaylistScreen.module.scss";

export const PlaylistScreen = () => {
  const { id } = useParams<any>();
  const dispatch = useAppDispatch();
  const playlists = useAppSelector(selectPlaylists);
  const playlistsTracks = useAppSelector(selectPlaylistsTracks);

  useEffect(() => {
    dispatch(loadPlaylistTracksAction({ playlistId: id }));
  }, [id]);

  const targetTracks = playlistsTracks[id];

  if (!targetTracks?.length) {
    return <span>Playlist is empty or not loaded yet</span>;
  }

  return (
    <ScreenContainer>
      <div className={styles.playlist_screen}>
        <Tracklist tracks={targetTracks} />
      </div>
    </ScreenContainer>
  );
};
