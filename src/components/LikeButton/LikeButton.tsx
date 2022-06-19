import classNames from "classnames";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { TrackModel } from "../../commonTypes/deezerTypes";
import { addTrackToLikedAction, removeTrackFromLikedAction } from "../../sagas/userSaga";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import styles from "./LikeButton.module.sass";

export interface LikeButtonProps {
  liked: boolean;
  track: TrackModel;
  className?: string;
}

export const LikeButton = ({ liked, track, className }: LikeButtonProps) => {
  const dispatch = useAppDispatch();

  const handleLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    if (liked) {
      dispatch(removeTrackFromLikedAction({ track }));
    } else {
      dispatch(addTrackToLikedAction({ track }));
    }
  };

  const finalClassName = classNames([styles.like_button, className]);

  return (
    <div className={finalClassName}>
      <Icon
        stopClickPropagation
        name="heart"
        type={liked ? IconType.Solid : IconType.Light}
        onClick={handleLikeClick}
      />
    </div>
  );
};
