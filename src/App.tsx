import React, { useCallback, useEffect, useState } from "react";
import "./App.sass";
import { BrowserRouter, Navigate,  Routes, Route } from "react-router-dom";
import LikedScreen from "./screens/likedScreen/LikedScreen";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeIsMobileEnv, selectIsMobileEnv } from "./slices/appSlice";
import { selectDeezerToken } from "./slices/deezerSlice";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import { loadBasicUserInfo } from "./sagas/userSaga";
import { WelcomeScreen } from "./screens/WelcomeScreen/WelcomeScreen";
import { CollectionScreen } from "./screens/collectionScreen/CollectionScreen";
import { PlaylistScreen } from "./screens/playlistScreen/PlaylistScreen";
import { RecommendedScreen } from "./screens/recommendedScreen/RecommendedScreen";
import { CallbackScreen } from "./screens/callbackScreen/CallbackScreen";
import { handlePostMessageAction } from "./sagas/postMessageSaga";
import { PlayerContextProvider } from "./components/PlayerContextProvider/PlayerContextProvider";
import { NotificationHub } from "./components/NotificationsHub/NotificationHub";
import { ProfileScreen } from "./screens/profileScreen/ProfileScreen";
import { DesktopScreen } from "./screens/desktopScreen/DesktopScreen";

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
  useEffect(() => {
    window.addEventListener("message", (message) => {
      if (!message.data.source?.includes("devtools") && message.data.type !== "webpackWarnings") {
        dispatch(handlePostMessageAction({ message }));
      }
    });
  }, []);

  //load user info
  useEffect(() => {
    //@ts-ignore
    if (deezerToken) {
      dispatch(loadBasicUserInfo());
    }
  }, [deezerToken]);

  if (!isMobile) {
    return <DesktopScreen />;
  }

  if (!deezerToken) {
    return (
      <div className="App">
        <BrowserRouter>
          <NotificationHub />
          <Routes>
            <Route  path="/cb" element={ <CallbackScreen />}>
            </Route>
            <Route path="*" element={ <WelcomeScreen />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <PlayerContextProvider>
        <BrowserRouter>
          <NotificationHub />
          <Routes>
            <Route  path="/" element={ <Navigate to="/liked" />}/>
            <Route  path="/liked"  element={<LikedScreen />} />
            <Route  path="/search" element={    <SearchScreen />} />
            <Route  path="/collection" element={ <CollectionScreen />} />
            <Route  path="/recommended" element={       <RecommendedScreen />} />
            <Route  path="/profile" element={ <ProfileScreen />} />
            <Route path="/playlist/:id" element={ <PlaylistScreen />} />
          </Routes>
        </BrowserRouter>
      </PlayerContextProvider>
    </div>
  );
}

export default App;
