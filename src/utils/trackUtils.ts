import { resourceUsage } from "process";
import { select } from "redux-saga/effects";
import { selectLikedTracksIds } from "../slices/userSlice";

export function* isLiked(trackId: string) {
  const likedTracksIds: string[] = yield select(selectLikedTracksIds);

  return !likedTracksIds.includes(trackId);
}

export const isExpired = (url: string) => {
  console.log(url);
  const urlObject = new URL(url);

  const expireDate = urlObject.searchParams.get("expire");

  if (expireDate) {
    return new Date(+expireDate) <= new Date();
  }

  return true;
};
