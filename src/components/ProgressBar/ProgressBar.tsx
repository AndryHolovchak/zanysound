import React, { Touch, TouchEventHandler, useContext, useEffect, useRef, useState } from "react";
import { PlayerReadyState } from "../../commonDefinitions/playerCommonDefinitions";
import PlayerContext from "../../contexts/playerContext";
import { sec2MMSS } from "../../utils/timeUtils";
import style from "./ProgressBar.module.sass";
import { SeekingState } from "./static/progressBarCommonDefinition";

export const ProgressBar = () => {
  const playerContext = useContext(PlayerContext);
  const [seekingState, setSeekingState] = useState(SeekingState.None);
  const [selectedTime, setSelectedTime] = useState(0);
  const lineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (seekingState === SeekingState.Finished && playerContext.readyState === PlayerReadyState.Ready) {
      setSeekingState(SeekingState.None);
    }
  }, [playerContext.readyState, seekingState]);

  const getTouchPositionInsideLineContainer = (touch: Touch) => {
    if (!lineContainerRef.current) {
      return 0;
    }

    const lineContainerRect = lineContainerRef.current.getBoundingClientRect();
    const selectedPosition = Math.max(0, Math.min(touch.clientX - lineContainerRect.left, lineContainerRef.current.clientWidth));
    const selectedInPercentages = selectedPosition / lineContainerRef.current.clientWidth;

    return duration * selectedInPercentages;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setSeekingState(SeekingState.InProgress);
    setSelectedTime(getTouchPositionInsideLineContainer(e.touches[0]));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setSelectedTime(getTouchPositionInsideLineContainer(e.touches[0]));
  };

  const handleTouchEnd = () => {
    playerContext.seek(selectedTime);
    setSeekingState(SeekingState.Finished);
  };

  const duration = playerContext.duration;
  const progress = playerContext.progress;

  let lineWidth = "0%";

  if (duration !== 0) {
    if (seekingState !== SeekingState.None && lineContainerRef.current) {
      lineWidth = `${((selectedTime / duration) * 100).toFixed(2)}%`;
    } else {
      lineWidth = `${((progress / duration) * 100).toFixed(2)}%`;
    }
  }

  return (
    <div className={style.progress_bar}>
      <div className={style.progress_bar__top}>
        <div className={style.progress_bar__progress}>{sec2MMSS(seekingState ? selectedTime : progress)}</div>
        <div className={style.progress_bar__duration}>{sec2MMSS(duration)}</div>
      </div>
      <div
        className={style.progress_bar__line_container}
        ref={lineContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className={style.progress_bar__line} style={{ width: lineWidth }} />
      </div>
    </div>
  );
};
