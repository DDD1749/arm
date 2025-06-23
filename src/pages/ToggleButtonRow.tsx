// ToggleButtonRow.tsx
import React, { useState } from "react";
import ButtonGlass from "./ButtonGlass";

type ToggleButtonRowProps = {
  options: string[];
  size?: "small" | "medium" | "large";
};

const ToggleButtonRow: React.FC<ToggleButtonRowProps> = ({
  options,
  size = "medium",
}) => {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
      {options.map((label, i) => (
        <ButtonGlass
          key={label}
          size={size}
          selected={selected === i}
          onClick={() => setSelected(i)}
        >
          {label}
        </ButtonGlass>
      ))}
    </div>
  );
};

export default ToggleButtonRow;
