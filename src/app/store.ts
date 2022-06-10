import deezerSlice from "./../slices/deezerSlice";
import { configureStore, createStore, applyMiddleware, ThunkAction, Action, combineReducers, compose } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "../slices/appSlice";
import searchSlice from "../slices/searchSlice";
import rootSaga from "../sagas/rootSaga";
import userSlice from "../slices/userSlice";
import mp3Slice from "./../slices/mp3Slice";
import playerSlice from "./../slices/playerSlice";
import contentSlice from "./../slices/contentSlice";
import notificationSlice from "../slices/notificationSlice";

const persistConfig = {
  key: "persist-root",
  storage,
  blacklist: ["notification", "content", "search"],
};

const rootReducer = combineReducers({
  app: appSlice,
  deezer: deezerSlice,
  search: searchSlice,
  user: userSlice,
  mp3: mp3Slice,
  player: playerSlice,
  content: contentSlice,
  notification: notificationSlice,
});

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
//@ts-ignore
const middlewareEnhancer = compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(persistedReducer, undefined, middlewareEnhancer);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
