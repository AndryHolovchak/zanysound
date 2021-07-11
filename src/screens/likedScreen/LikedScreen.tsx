import React from "react";
import { useAppSelector } from "../../app/hooks";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Track from "../../components/Track/Track";
import Tracklist from "../../components/Tracklist/Tracklist";
import { selectLikedTracks } from "../../slices/userSlice";
import style from "./likedScreen.module.sass";

const LikedScreen = () => {
  const likedTracks = useAppSelector(selectLikedTracks);

  return (
    <ScreenContainer>
      <div className={style.liked_screen}>
        <Tracklist tracks={likedTracks} />
      </div>
    </ScreenContainer>
  );
};

export default LikedScreen;
