// ButtonGlass.tsx
import React, { ReactNode } from "react";
import "./ButtonGlass.css";

type ButtonGlassProps = {
  size?: "small" | "medium" | "large";
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

const ButtonGlass: React.FC<ButtonGlassProps> = ({
  size = "medium",
  selected = false,
  onClick,
  children,
  className = "",
}) => {
  const sizeClass = {
    small: "btn-small",
    medium: "btn-medium",
    large: "btn-large",
  }[size];

  return (
    <div className={`button-wrap ${sizeClass} ${selected ? "selected" : ""} ${className}`}>
      <button
        type="button"
        className={selected ? "pressed" : ""}
        onClick={onClick}
      >
        <span>{children}</span>
      </button>
      <div className="button-shadow"></div>
    </div>
  );
};

export default ButtonGlass;
