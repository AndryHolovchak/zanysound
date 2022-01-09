import React from "react";
import { useAppSelector } from "../../app/hooks";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import { PlaylistPreview } from "../../components/PlaylistPreview/PlaylistPreview";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { selectUserPlaylists } from "../../slices/userSlice";
import styles from "./collectionScreen.module.sass";

export const CollectionScreen = () => {
  const playlists: PlaylistModel[] = useAppSelector(selectUserPlaylists);

  return (
    <ScreenContainer>
      <div className={styles.collection_screen}>
        {playlists.map((e) => (
          <PlaylistPreview playlistModel={e} />
        ))}
      </div>
    </ScreenContainer>
  );
};
