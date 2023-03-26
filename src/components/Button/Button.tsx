import React from "react";

interface ButtonProps {
  color?: "#219653" | "#FF5B2E" | "rgba(210, 32, 67, 1)";
  type?: "outlined" | "filled";
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  color = "#219653",
  type = "filled",
  text,
  onClick,
}) => {
  const isFilled = type === "filled";

  return (
    <button
      onClick={onClick}
      style={{
        border: !isFilled ? `3px solid ${color}` : "none",
        background: isFilled ? color : "transparetn",
        padding: "16px 96px",
        color: isFilled ? "#fff" : color,
        fontSize: 24,
        cursor: "pointer",
        textTransform: "uppercase",
      }}
    >
      {text}
    </button>
  );
};
