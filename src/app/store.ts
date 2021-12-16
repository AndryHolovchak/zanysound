import deezerSlice from "./../slices/deezerSlice";
import { configureStore, createStore, applyMiddleware, ThunkAction, Action, combineReducers, compose } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appSlice from "../slices/appSlice";
import searchSlice from "../slices/searchSlice";
import rootSaga from "../sagas/rootSaga";
import userSlice from "../slices/userSlice";
import mp3Slice from "./../slices/mp3Slice";
import playerSlice from "./../slices/playerSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    app: appSlice,
    deezer: deezerSlice,
    search: searchSlice,
    user: userSlice,
    mp3: mp3Slice,
    player: playerSlice,
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
