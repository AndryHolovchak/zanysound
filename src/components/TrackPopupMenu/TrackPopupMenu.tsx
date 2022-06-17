import classNames from "classnames";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeFromPlaylistAction } from "../../sagas/contentSaga";
import { AddToPlaylistModal } from "../AddToPlaylistModal/AddToPlaylistModal";
import { PopupMenu } from "../PopupMenu/PopupMenu";
import { PopupMenuItem } from "../PopupMenu/static/popupMenuTypes";
import style from "./TrackPopupMenu.module.sass";

export interface TrackPopupMenuProps {
  trackId: string;
  playlistId?: string;
  className?: string;
  mainIconClassName?: string;
}

export const TrackPopupMenu = ({ trackId, playlistId, className, mainIconClassName }: TrackPopupMenuProps) => {
  const dispatch = useAppDispatch();

  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);

  const generatePopupMenuItems = () => {
    const items: PopupMenuItem[] = [
      {
        text: "Add to playlist",
        iconName: "plus",
        onClick: () => setShowPlaylistsModal(true),
      },
    ];

    if (playlistId) {
      items.push({
        text: "Remove from playlist",
        iconName: "minus",
        textClassName: style.track_popup_menu__delete_text,
        iconClassName: style.track_popup_menu__delete_icon,
        onClick: () => dispatch(removeFromPlaylistAction({ trackId, playlistId })),
      });
    }
    return items;
  };

  const finalClassName = classNames([style.track_popup_menu, className]);

  return (
    <>
      <PopupMenu className={finalClassName} items={generatePopupMenuItems()} mainIconClassName={mainIconClassName} />
      {showPlaylistsModal && <AddToPlaylistModal onClose={() => setShowPlaylistsModal(false)} trackId={trackId} />}
    </>
  );
};
