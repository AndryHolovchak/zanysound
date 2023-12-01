import { ReactNode } from "react";

export type PropsWithChildrenOnly = {children: ReactNode};

export type WithChildren<T> = T & PropsWithChildrenOnly;