import { Notification } from "../commonTypes/miscTypes";

export const generateId = () => "_" + Math.random().toString(36).substring(2, 9);

export const copyObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export const createNotificationItem = (title: string, text?: string, lifetime: number = 3000): Notification => {
  return {
    id: generateId(),
    title,
    text,
    lifetime,
    timestamp: Date.now(),
  };
};
