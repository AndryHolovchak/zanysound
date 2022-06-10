import { put, takeLatest } from "redux-saga/effects";
import { changeDeezerToken } from "../slices/deezerSlice";
import { object2queryParams } from "../utils/urlUtils";

const DEEZER_APP_ID = "535202";
const DEEZER_OAUTH_REDIR = "http://localhost:3000/cb";
const DEEZER_OAUTH_URL = "https://connect.deezer.com/oauth/auth.php";
const DEEZER_OAUTH_PERMS = "basic_access,email,manage_community,manage_library,delete_library,offline_access";

const SIGN_IN_BY_REDIRECT = "deezer/signInBy/redirect";
const SIGN_OUT = "deezer/signOut";

export const signInByRedirectAction = () => ({
  type: SIGN_IN_BY_REDIRECT,
});

export const signOutAction = () => ({
  type: SIGN_OUT,
});

function* signInByRedirectWatcher() {
  const authUrlParams = object2queryParams({
    app_id: DEEZER_APP_ID,
    redirect_uri: DEEZER_OAUTH_REDIR,
    perms: DEEZER_OAUTH_PERMS,
    format: "popup",
    response_type: "token",
  });

  window.open(DEEZER_OAUTH_URL + authUrlParams, "_self");
}

function* signOutWatcher() {
  yield put(changeDeezerToken(""));
}

export default function* deezerSaga() {
  yield takeLatest(SIGN_IN_BY_REDIRECT, signInByRedirectWatcher);
  yield takeLatest(SIGN_OUT, signOutWatcher);
}
