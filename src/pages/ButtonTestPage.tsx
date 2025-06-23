// ButtonTestPage.tsx
import React from "react";
import ToggleButtonRow from "./ToggleButtonRow";

const ButtonTestPage = () => (
  <div
    style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2.5rem",
      background: "#f1f1f1",
    }}
  >
    <h2>Тест стеклянных кнопок</h2>
    <ToggleButtonRow options={["Первая", "Вторая", "Третья"]} size="small" />
    <ToggleButtonRow options={["Левая", "Центр", "Правая"]} size="medium" />
    <ToggleButtonRow options={["Red", "Green", "Blue"]} size="large" />
  </div>
);

export default ButtonTestPage;
