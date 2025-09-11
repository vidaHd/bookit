import React from "react";
import "../styles/button.scss";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: Props) => (
  <button className="btn" onClick={onClick}>
    {children}
  </button>
);

export default Button;
