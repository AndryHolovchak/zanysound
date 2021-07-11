import { all, fork } from "redux-saga/effects";
import searchSaga from "./searchSaga";
import deezerSaga from "./deezerSaga";
import userSaga from "./userSaga";
import mp3Saga from "./mp3Saga";

export default function* rootSaga() {
  yield all([
    fork(searchSaga),
    fork(deezerSaga),
    fork(userSaga),
    fork(mp3Saga),
  ]);
}
