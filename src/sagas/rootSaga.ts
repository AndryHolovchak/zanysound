import { all, fork } from "redux-saga/effects";
import searchSaga from "./searchSaga";
import deezerSaga from "./deezerSaga";

export default function* rootSaga() {
  yield all([fork(searchSaga), fork(deezerSaga)]);
}
