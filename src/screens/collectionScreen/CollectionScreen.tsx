import React from "react";
import { useAppSelector } from "../../app/hooks";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import { Playlists } from "../../commonTypes/miscTypes";
import { PlaylistPreview } from "../../components/PlaylistPreview/PlaylistPreview";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { selectPlaylists } from "../../slices/contentSlice";
import { selectUserPlaylistsIds } from "../../slices/userSlice";
import styles from "./collectionScreen.module.sass";

export const CollectionScreen = () => {
  const playlists: Playlists = useAppSelector(selectPlaylists);
  const userPlaylistsIds: string[] = useAppSelector(selectUserPlaylistsIds);

  const userPlaylists: PlaylistModel[] = Object.values(playlists).filter((i) => userPlaylistsIds.includes(i.id));

  return (
    <ScreenContainer>
      <div className={styles.collection_screen}>
        {userPlaylists.map((e) => (
          <PlaylistPreview playlistModel={e} />
        ))}
      </div>
    </ScreenContainer>
  );
};
