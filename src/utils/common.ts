import { NotificationType } from "./../commonDefinitions/miscCommonDefinitions";
import { Notification } from "../commonTypes/miscTypes";

export const generateId = () => "_" + Math.random().toString(36).substring(2, 9);

export const copyObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export const createNotificationItem = (type: NotificationType, text: string, lifetime: number = 3000): Notification => {
  return {
    id: generateId(),
    type,
    text,
    lifetime,
    timestamp: Date.now(),
  };
};
