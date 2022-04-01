import React, { useCallback, useEffect, useState } from "react";
import "./App.sass";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LikedScreen from "./screens/likedScreen/LikedScreen";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeIsMobileEnv, selectIsMobileEnv } from "./slices/appSlice";
import { initializeDeezer, signInByRedirect } from "./sagas/deezerSaga";
import { changeDeezerIsInitialized, selectDeezerIsInitialized, selectDeezerToken } from "./slices/deezerSlice";
import Button from "./components/Button/Button";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import { loadBasicUserInfo } from "./sagas/userSaga";
import { WelcomeScreen } from "./screens/WelcomeScreen/WelcomeScreen";
import { CollectionScreen } from "./screens/collectionScreen/CollectionScreen";
import { PlaylistScreen } from "./screens/playlistScreen/PlaylistScreen";
import { RecommendedScreen } from "./screens/recommendedScreen/RecommendedScreen";

function App() {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobileEnv);
  const deezerToken = useAppSelector(selectDeezerToken);
  const deezerIsInitialized = useAppSelector(selectDeezerIsInitialized);

  const handleWindowResize = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (+(windowWidth <= 1024) ^ +isMobile) {
      dispatch(changeIsMobileEnv(!isMobile));
    }
  }, [isMobile, dispatch]);

  //update isMobile value on resize
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  //isMobile init value
  useEffect(() => {
    dispatch(changeIsMobileEnv(window.innerWidth <= 1024));
  }, []);

  //clear deezerIsInitialized
  useEffect(() => {
    dispatch(changeDeezerIsInitialized(false));
  }, []);

  //init deezer
  useEffect(() => {
    dispatch(initializeDeezer({ dispatch }));
  }, []);

  //assing deezer token to DZ
  useEffect(() => {
    //@ts-ignore
    window.DZ && (window.DZ.token = deezerToken);
    //@ts-ignore
  }, [deezerToken, window.DZ]);

  //load user info
  useEffect(() => {
    //@ts-ignore
    if (window.DZ?.token && deezerIsInitialized && deezerToken) {
      dispatch(loadBasicUserInfo());
    }
    //@ts-ignore
  }, [window.DZ?.token, deezerIsInitialized, deezerToken]);

  if (!deezerToken) {
    return <WelcomeScreen />;
  }

  //@ts-ignore
  if (window.DZ?.token) {
    return <span>No DZ.token</span>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/liked" />} />
          <Route exact path="/liked">
            <LikedScreen />
          </Route>
          <Route exact path="/search">
            <SearchScreen />
          </Route>
          <Route exact path="/collection">
            <CollectionScreen />
          </Route>
          <Route exact path="/recommended">
            <RecommendedScreen />
          </Route>
          <Route exact path="/playlist/:id">
            <PlaylistScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
