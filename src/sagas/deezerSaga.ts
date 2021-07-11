import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { all, delay, put, takeLatest } from "redux-saga/effects";
import { DeezerSignInStatus } from "../commonDefinitions/deezerCommonDefinitions";
import config from "../config/config";
import {
  changeDeezerIsInitialized,
  changeDeezerSignInStatus,
} from "../slices/deezerSlice";

export const INITIALIZE_DEEZER = "deezer/initialize";
export const SIGN_IN_BY_LOCAL_DATA = "deezer/signInBy/localData";
export const SIGN_IN_BY_REDIRECT = "deezer/signInBy/redirect";

export interface InitializeDeezerPayload {
  dispatch: Dispatch<AnyAction>;
}

export interface SignInByRedirectPayload {
  dispatch: Dispatch<AnyAction>;
}

export interface InitializeDeezer {
  type: typeof INITIALIZE_DEEZER;
  payload: InitializeDeezerPayload;
}

export interface SignInByLocalData {
  type: typeof SIGN_IN_BY_LOCAL_DATA;
}

export interface SignInByRedirect {
  type: typeof SIGN_IN_BY_REDIRECT;
  payload: SignInByRedirectPayload;
}

export const initializeDeezer = (
  payload: InitializeDeezerPayload
): InitializeDeezer => ({
  type: INITIALIZE_DEEZER,
  payload,
});

export const singInByLocalData = (): SignInByLocalData => ({
  type: SIGN_IN_BY_LOCAL_DATA,
});

export const signInByRedirect = (
  payload: SignInByRedirectPayload
): SignInByRedirect => ({
  type: SIGN_IN_BY_REDIRECT,
  payload,
});

export function initializeDeezerWatcher({ payload }: InitializeDeezer) {
  const { dispatch } = payload;

  //@ts-ignore
  window.dzAsyncInit = async function () {
    //@ts-ignore
    await DZ.init({
      appId: config.DEEZER_APP_ID,
      channelUrl: document.location.origin + "/channel.html",
    });

    dispatch(changeDeezerIsInitialized(true));
  };

  const e = document.createElement("script");
  e.src = "https://cdns-files.dzcdn.net/js/min/dz.js";
  e.async = true;
  document.getElementById("dz-root")?.appendChild(e);
}

export function* signInByLocalDataWatcher() {
  let tokenFromStorage = window.localStorage.getItem(
    config.DEEZER_TOKEN_STORAGE_KEY
  );

  //@ts-ignore
  DZ.token = tokenFromStorage === "null" ? null : tokenFromStorage;

  yield put(
    changeDeezerSignInStatus(
      //@ts-ignore
      DZ.token ? DeezerSignInStatus.SignedIn : DeezerSignInStatus.FailedByLocal
    )
  );
}

export function signInByRedirectWatcher({ payload }: SignInByRedirect) {
  const { dispatch } = payload;

  //@ts-ignore
  DZ.login(
    function (response: any) {
      //@ts-ignore
      if (DZ.token) {
        //@ts-ignore
        window.localStorage.setItem(config.DEEZER_TOKEN_STORAGE_KEY, DZ.token);
      }
      dispatch(
        changeDeezerSignInStatus(
          //@ts-ignore
          !!DZ.token
            ? DeezerSignInStatus.SignedIn
            : DeezerSignInStatus.FailedByRedirect
        )
      );
    },
    {
      perms:
        "basic_access,email,manage_community,manage_library,delete_library,offline_access",
    }
  );
}

export default function* deezerSaga() {
  yield takeLatest(INITIALIZE_DEEZER, initializeDeezerWatcher);
  yield takeLatest(SIGN_IN_BY_LOCAL_DATA, signInByLocalDataWatcher);
  yield takeLatest(SIGN_IN_BY_REDIRECT, signInByRedirectWatcher);
}
