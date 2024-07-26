import React from "react";
import Button from "@mui/joy/Button";

interface ToolsBarProps {
  generateClick: () => void;
}

export const ToolsBar: React.FC<ToolsBarProps> = ({ generateClick }) => {
  return (
    <div
      style={{
        width: "50vw",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        fontFamily: "noto-sans-sc",
      }}
    >
      <h2> 🛠 Tools Bar</h2>
      <Button onClick={generateClick} style={{ width: "fit-content" }}>
        ⛰️ Click to generate !!!
      </Button>
    </div>
  );
};
