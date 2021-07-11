import { all, fork } from "redux-saga/effects";
import deezerSaga from "./deezerSaga";

export default function* rootSaga() {
  yield all([
    fork(deezerSaga)
  ]);
}
