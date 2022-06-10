import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { loadRecommendedTracksAction } from "../../sagas/contentSaga";
import { selectRecommendedTracks } from "../../slices/contentSlice";
import styles from "./RecommendedScreen.module.sass";

export const RecommendedScreen = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectRecommendedTracks);

  useEffect(() => {
    if (!tracks.length) {
      dispatch(loadRecommendedTracksAction({ startIndex: 0 }));
    }
  }, []);

  return (
    <ScreenContainer>
      <div className={styles.recommended_screen}>
        <Tracklist tracks={tracks} id="1" />
      </div>
    </ScreenContainer>
  );
};
