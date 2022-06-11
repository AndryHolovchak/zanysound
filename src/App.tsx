import React, { useCallback, useEffect, useState } from "react";
import "./App.sass";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LikedScreen from "./screens/likedScreen/LikedScreen";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeIsMobileEnv, selectIsMobileEnv } from "./slices/appSlice";
import { changeDeezerToken, selectDeezerToken } from "./slices/deezerSlice";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import { loadBasicUserInfo } from "./sagas/userSaga";
import { WelcomeScreen } from "./screens/WelcomeScreen/WelcomeScreen";
import { CollectionScreen } from "./screens/collectionScreen/CollectionScreen";
import { PlaylistScreen } from "./screens/playlistScreen/PlaylistScreen";
import { RecommendedScreen } from "./screens/recommendedScreen/RecommendedScreen";
import { deezerApiRequest } from "./helpers/deezerApiHelper";
import { CallbackScreen } from "./screens/callbackScreen/CallbackScreen";
import { handlePostMessageAction } from "./sagas/postMessageSaga";
import { PlayerContextProvider } from "./components/PlayerContextProvider/PlayerContextProvider";
import { createNotificationItem } from "./utils/common";
import { addNotification } from "./slices/notificationSlice";
import { NotificationHub } from "./components/NotificationsHub/NotificationHub";
import { ProfileScreen } from "./screens/profileScreen/ProfileScreen";

function App() {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobileEnv);
  const deezerToken = useAppSelector(selectDeezerToken);

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

  //set post message handler
  useState(() => {
    window.addEventListener("message", (message) => {
      if (!message.data.source?.includes("@devtools") && message.data.type !== "webpackWarnings") {
        dispatch(handlePostMessageAction({ message }));
      }
    });
  });

  //load user info
  useEffect(() => {
    //@ts-ignore
    if (deezerToken) {
      dispatch(loadBasicUserInfo());
    }
  }, [deezerToken]);

  if (!deezerToken) {
    return (
      <div className="App">
        <BrowserRouter>
          <NotificationHub />
          <Switch>
            <Route exact path="/cb">
              <CallbackScreen />
            </Route>
            <Route path="*">
              <WelcomeScreen />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <PlayerContextProvider>
        <BrowserRouter>
          <NotificationHub />
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
            <Route exact path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/playlist/:id">
              <PlaylistScreen />
            </Route>
          </Switch>
        </BrowserRouter>
      </PlayerContextProvider>
    </div>
  );
}

export default App;
