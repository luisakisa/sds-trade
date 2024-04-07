import React from "react";
import "./style.css";

interface Props {
  background?: boolean;
  onClick: () => void;
  text?: string;
  style?: React.CSSProperties;
}

function Button({ background = true, onClick, text, style }: Props) {
  return background ? (
    <button
      className="control-button control-button-background"
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  ) : (
    <button
      className="control-button control-button-empty "
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
