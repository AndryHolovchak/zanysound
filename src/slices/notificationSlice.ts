import { Notification, NotificationsCollection } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface NotificationState {
  items: NotificationsCollection;
}

const initialState: NotificationState = {
  items: {},
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
