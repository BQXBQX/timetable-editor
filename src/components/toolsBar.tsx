import React, { memo } from "react";
import Button from "@mui/joy/Button";

interface ToolsBarProps {
  generateClick: () => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({ generateClick }) => {
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
      <h2>📚 Tutorial</h2>
      <li>👋 Click bottom generate button and see left section.</li>
      <li>🦟 Double click text to change textarea value.</li>
      <li>👍 "Enter" to save value and exit, "Esc" to exit.</li>
      <h2> 🛠 Tools Bar</h2>
      <Button
        onClick={generateClick}
        style={{ width: "fit-content" }}
        variant="outlined"
      >
        ⛰️ Click to generate !!!
      </Button>
    </div>
  );
};

export const MemoToolsBar = memo(ToolsBar);
