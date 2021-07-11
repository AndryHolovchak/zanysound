import React from "react";
import classNames from "classnames";
import { TrackModel } from "../../commonTypes/deezerTypes";
import Track from "../Track/Track";
import style from "./tracklist.module.sass";

export interface TracklistProps {
  tracks: TrackModel[];
  className?: string;
}

const Tracklist: React.FC<TracklistProps> = ({ tracks, className }) => {
  const finalClassName = classNames([style.tracklist, className]);

  return (
    <div className={finalClassName}>
      <div className={style.tracklist__inner}>
        {tracks.map((e) => (
          <Track key={e.id} model={e} className={style.tracklist__track} />
        ))}
      </div>
    </div>
  );
};

export default Tracklist;
