export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface Props {
  onClick: () => void;
  children: React.ReactNode;
  type: ButtonType;
}
