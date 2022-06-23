import classNames from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationType } from "../../commonDefinitions/miscCommonDefinitions";
import { Notification } from "../../commonTypes/miscTypes";
import { changeNotifications, selectNotifications } from "../../slices/notificationSlice";
import { copyObject } from "../../utils/common";
import Icon from "../Icon/Icon";
import style from "./NotificationHub.module.sass";

export const NotificationHub = () => {
  const dispatch = useAppDispatch();

  const notificationsCollection = useAppSelector(selectNotifications);
  const notifications = Object.values(notificationsCollection).sort((a, b) => b.timestamp - a.timestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      notifications.forEach((notification) => {
        if (notification.timestamp + notification.lifetime <= Date.now()) {
          removeNotification(notification);
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [notificationsCollection, notifications]);

  const removeNotification = (model: Notification) => {
    const notificationsCollectionCopy = copyObject(notificationsCollection);

    delete notificationsCollectionCopy[model.id];
    dispatch(changeNotifications(notificationsCollectionCopy));
  };

  return (
    <div className={style.notification_hub}>
      {notifications.map((e) => (
        <NotificationItem key={e.id} model={e} onRemove={removeNotification} />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  model: Notification;
  onRemove: (model: Notification) => void;
}

const NotificationItem = ({ model, onRemove }: NotificationItemProps) => {
  const finalClassName = classNames([
    style.notification_item,
    model.type === NotificationType.Success && style["notification_item--success"],
    model.type === NotificationType.Error && style["notification_item--error"],
  ]);

  return (
    <div className={finalClassName}>
      <div className={style.notification_item__left_border}>
        <Icon
          name={model.type === NotificationType.Success ? "check" : "fire"}
          className={style.notification_item__border_icon}
        />
      </div>
      <span className={style.notification_item__text}>{model.text}</span>
      <Icon name="trash" className={style.notification_item__close_icon} onClick={() => onRemove(model)} />
    </div>
  );
};
