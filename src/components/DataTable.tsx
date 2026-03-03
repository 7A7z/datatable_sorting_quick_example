import React from "react";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: number | string;
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  dense,
}: {
  columns: Column<T>[];
  rows: T[];
  dense?: boolean;
}) {
  return (
    <div style={{ 
      overflow: "auto", 
      background: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb"
    }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: dense ? 13 : 14,
        }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: "left",
                  padding: dense ? "10px 16px" : "14px 16px",
                  color: "#4b5563",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  width: c.width,
                  textTransform: "uppercase",
                  fontSize: dense ? 11 : 12,
                  letterSpacing: "0.05em"
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: "32px 16px", color: "#6b7280", textAlign: "center" }}
              >
                No data available.
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? "#ffffff" : "#f9fafb",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#ffffff" : "#f9fafb")}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    style={{
                      padding: dense ? "10px 16px" : "14px 16px",
                      borderBottom: i === rows.length - 1 ? "none" : "1px solid #e5e7eb",
                      whiteSpace: "nowrap",
                      color: "#111827"
                    }}
                  >
                    {c.render ? c.render(r) : String(r[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
