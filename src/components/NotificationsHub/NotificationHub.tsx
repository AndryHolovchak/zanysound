import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Notification } from "../../commonTypes/miscTypes";
import { changeNotifications, selectNotifications } from "../../slices/notificationSlice";
import { copyObject } from "../../utils/common";
import style from "./NotificationHub.module.sass";

export const NotificationHub = () => {
  const dispatch = useAppDispatch();

  const notificationsCollection = useAppSelector(selectNotifications);
  const notifications = Object.values(notificationsCollection).sort((a, b) => b.timestamp - a.timestamp);

  useEffect(() => {
    const notificationsCollectionCopy = copyObject(notificationsCollection);

    const interval = setInterval(() => {
      notifications.forEach((notification) => {
        if (notification.timestamp + notification.lifetime <= Date.now()) {
          delete notificationsCollectionCopy[notification.id];
          dispatch(changeNotifications(notificationsCollectionCopy));
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [notificationsCollection, notifications]);

  return (
    <div className={style.notification_hub}>
      {notifications.map((e) => (
        <NotificationItem key={e.id} model={e} />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  model: Notification;
}

const NotificationItem = ({ model }: NotificationItemProps) => {
  return (
    <div className={style.notification_item}>
      <span className={style.notification_item__title}>{model.title}</span>
    </div>
  );
};
