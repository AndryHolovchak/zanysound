import { select } from "redux-saga/effects";
import { selectLikedTracksIds } from "../slices/userSlice";

export function* isLiked(trackId: string) {
  const likedTracksIds: string[] = yield select(selectLikedTracksIds);

  return !likedTracksIds.includes(trackId);
}

export const isExpired = (url: string) => {
  const urlObject = new URL(url);

  const expireDate = urlObject.searchParams.get("expire");

  if (expireDate) {
    const expireDateMs = +expireDate * 1000;
    return expireDateMs <= Date.now();
  }

  return true;
};
