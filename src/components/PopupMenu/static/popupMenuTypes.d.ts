export interface PopupMenuItem {
  iconName: string;
  text: string;
  onClick: () => void;
  textClassName?: string;
  iconClassName?: string;
}
