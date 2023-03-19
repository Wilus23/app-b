import React from "react";
import earningIcon from "./path/to/earningIcon.png";

const EarningItem = ({ earning }) => {
  const date = new Date(earning.date).toLocaleDateString();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <img
        src={earningIcon}
        alt="Earning icon"
        style={{ marginRight: "8px" }}
      />
      <div>
        <div style={{ fontSize: "14px", color: "#0B0B0B" }}>
          {earning.category}
        </div>
        <div style={{ fontSize: "12px", color: "#A5A5A5" }}>{date}</div>
      </div>
      <div style={{ fontSize: "15px", fontWeight: "600" }}>
        {Math.abs(earning.amount)} zł
      </div>
    </div>
  );
};

export default EarningItem;
