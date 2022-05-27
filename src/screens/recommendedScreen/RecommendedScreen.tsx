import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { loadRecommendedTracksAction } from "../../sagas/contentSaga";
import { selectRecommendedTracks } from "../../slices/contentSlice";
import styles from "./RecommendedScreen.module.scss";

export const RecommendedScreen = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectRecommendedTracks);

  useEffect(() => {
    dispatch(loadRecommendedTracksAction());
  }, []);

  if (!tracks?.length) {
    return <span>Recommended tracks not loaded yey</span>;
  }

  return (
    <ScreenContainer>
      <div className={styles.recommended_screen}>
        <Tracklist tracks={tracks} id="1" />
      </div>
    </ScreenContainer>
  );
};
