import { useState } from "react";

function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "6px", width: "100%" }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
          fontSize: "1.1rem",
          cursor: "pointer",
          padding: "4px 0"
        }}
      >
        {title} {open ? "▲" : "▼"}
      </button>

      {open && (
        <div style={{ marginTop: "8px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Collapsible;
