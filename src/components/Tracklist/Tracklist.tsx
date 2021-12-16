import React from "react";
import classNames from "classnames";
import { TrackModel } from "../../commonTypes/deezerTypes";
import Track from "../Track/Track";
import style from "./tracklist.module.sass";
import { useAppDispatch } from "../../app/hooks";
import { changePlayerTrack } from "../../slices/playerSlice";

export interface TracklistProps {
  tracks: TrackModel[];
  className?: string;
}

const Tracklist: React.FC<TracklistProps> = ({ tracks, className }) => {
  const dispatch = useAppDispatch();
  const finalClassName = classNames([style.tracklist, className]);

  const handleTrackClick = (track: TrackModel) => {
    dispatch(changePlayerTrack(track));
  };

  return (
    <div className={finalClassName}>
      <div className={style.tracklist__inner}>
        {tracks.map((e) => (
          <Track key={e.id} model={e} onClick={() => handleTrackClick(e)} className={style.tracklist__track} />
        ))}
      </div>
    </div>
  );
};

export default Tracklist;
