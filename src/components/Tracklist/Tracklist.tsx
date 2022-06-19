import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { PlaylistModel, TrackModel } from "../../commonTypes/deezerTypes";
import Track from "../Track/Track";
import style from "./tracklist.module.sass";
import { useAppSelector } from "../../app/hooks";
import { selectLikedTracksIds } from "../../slices/userSlice";
import PlayerContext from "../../contexts/playerContext";

export interface TracklistProps {
  id: string;
  tracks: TrackModel[];
  className?: string;
  parentPlaylist?: PlaylistModel;
}

const Tracklist: React.FC<TracklistProps> = ({ id, tracks, className, parentPlaylist }) => {
  const player = useContext(PlayerContext);

  const finalClassName = classNames([style.tracklist, className]);
  const likedTracksIds = useAppSelector(selectLikedTracksIds);

  const handleTrackClick = (track: TrackModel) => {
    if (player.tracklistId === id) {
      if (player.track?.id === track.id) {
        player.togglePlay();
      } else {
        player.playTrackFromTracklist(track);
      }
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
      {tracks.map((e) => (
        <Track
          parentPlaylist={parentPlaylist}
          playing={player.tracklistId === id && player.track?.id === e.id}
          key={e.id}
          liked={likedTracksIds.includes(e.id)}
          model={e}
          onClick={() => handleTrackClick(e)}
          className={style.tracklist__track}
        />
      ))}
    </div>
  );
};

export default Tracklist;
