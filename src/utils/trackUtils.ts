import { select } from "redux-saga/effects";
import { selectLikedTracksIds } from "../slices/userSlice";

export function* isLiked(trackId: string) {
  const likedTracksIds: string[] = yield select(selectLikedTracksIds);

  return !likedTracksIds.includes(trackId);
}
