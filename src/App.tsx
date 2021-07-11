import React, { useCallback, useEffect } from "react";
import "./App.sass";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LikedScreen from "./screens/likedScreen/LikedScreen";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeIsMobileEnv, selectIsMobileEnv } from "./slices/appSlice";
import {
  initializeDeezer,
  signInByRedirect,
  singInByLocalData,
} from "./sagas/deezerSaga";
import {
  selectDeezerIsInitialized,
  selectDeezerSignInStatus,
} from "./slices/deezerSlice";
import { DeezerSignInStatus } from "./commonDefinitions/deezerCommonDefinitions";
import Button from "./components/Button/Button";

function App() {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobileEnv);
  const signInStatus = useAppSelector(selectDeezerSignInStatus);
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
  }, [dispatch]);

  //init deezer
  useEffect(() => {
    dispatch(initializeDeezer({ dispatch }));
  }, [dispatch]);

  //sign in using local data
  useEffect(() => {
    if (
      deezerIsInitialized &&
      signInStatus === DeezerSignInStatus.NotSignedIn
    ) {
      dispatch(singInByLocalData());
    }
  }, [dispatch, signInStatus, deezerIsInitialized]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/liked">
            <LikedScreen />
          </Route>
        </Switch>
      </BrowserRouter>
      {(signInStatus === DeezerSignInStatus.FailedByLocal ||
        signInStatus === DeezerSignInStatus.FailedByRedirect) && (
        <Button
          title="Sign in by Deezer"
          className={"App__sign_in_button"}
          onCLick={() => dispatch(signInByRedirect({ dispatch }))}
        />
      )}
    </div>
  );
}

export default App;
