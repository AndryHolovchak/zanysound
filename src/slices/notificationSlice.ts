import { Notification, NotificationsCollection } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { NotificationType } from "../commonDefinitions/miscCommonDefinitions";

export interface NotificationState {
  items: NotificationsCollection;
}

const initialState: NotificationState = {
  items: {
    // "0": {
    //   id: "0",
    //   type: NotificationType.Error,
    //   text: "Track is already in the playlist",
    //   timestamp: 1213,
    //   lifetime: 54654,
    // },
    // "1": {
    //   id: "1",
    //   type: NotificationType.Success,
    //   text: "Track added",
    //   timestamp: 1213,
    //   lifetime: 54654,
    // },
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeNotifications: (state, action: PayloadAction<NotificationsCollection>) => {
      state.items = { ...action.payload };
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items = { ...state.items, [action.payload.id]: action.payload };
    },
  },
});

export const { changeNotifications, addNotification } = notificationSlice.actions;

export const selectNotifications = (state: RootState) => state.notification.items;

export default notificationSlice.reducer;
