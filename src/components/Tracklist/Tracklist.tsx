import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { TrackModel } from "../../commonTypes/deezerTypes";
import Track from "../Track/Track";
import style from "./tracklist.module.sass";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changePlayerTrack } from "../../slices/playerSlice";
import { selectLikedTracks, selectLikedTracksIds } from "../../slices/userSlice";
import PlayerContext from "../../contexts/playerContext";

export interface TracklistProps {
  id: string;
  tracks: TrackModel[];
  className?: string;
}

const Tracklist: React.FC<TracklistProps> = ({ id, tracks, className }) => {
  const player = useContext(PlayerContext);

  const finalClassName = classNames([style.tracklist, className]);
  const likedTracksIds = useAppSelector(selectLikedTracksIds);

  const handleTrackClick = (track: TrackModel) => {
    if (player?.tracklistId === id) {
      player.playTrackFromTracklist(track);
    } else {
      player?.playNewTracklist(id, tracks, track);
    }
  };

  useEffect(() => {
    if (player.tracklistId === id) {
      player.syncTracklist(tracks);
    }
  }, [id, tracks]);

  return (
    <div className={finalClassName}>
      <div className={style.tracklist__inner}>
        {tracks.map((e) => (
          <Track key={e.id} liked={likedTracksIds.includes(e.id)} model={e} onClick={() => handleTrackClick(e)} className={style.tracklist__track} />
        ))}
      </div>
    </div>
  );
};

export default Tracklist;
