import deezerSlice from "./../slices/deezerSlice";
import {
  configureStore,
  createStore,
  applyMiddleware,
  ThunkAction,
  Action,
  combineReducers,
  compose,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "../slices/appSlice";
import searchSlice from "../slices/searchSlice";
import rootSaga from "../sagas/rootSaga";
import userSlice from "../slices/userSlice";
import mp3Slice from "./../slices/mp3Slice";
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
  content: contentSlice,
  notification: notificationSlice,
});

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

let middlewareEnhancer = null;

//@ts-ignore
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewareEnhancer = compose(
    applyMiddleware(sagaMiddleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  middlewareEnhancer = applyMiddleware(sagaMiddleware);
}

export const store = createStore(persistedReducer, undefined, middlewareEnhancer);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
