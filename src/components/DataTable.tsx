import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: number | string;
};

export type SortState<T> = { key: keyof T; dir: "asc" | "desc" };

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  dense,
  initialSortKey,
  initialSortDir = "asc",
  onSortChange,
  pageSize,
}: {
  columns: Column<T>[];
  rows: T[];
  dense?: boolean;
  initialSortKey?: keyof T;
  initialSortDir?: "asc" | "desc";
  onSortChange?: (state: SortState<T>) => void;
  pageSize?: number;
}) {
  const [sortkey, setSortkey] = useState<keyof T | undefined>(
    initialSortKey ?? ("id" as keyof T)
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">(initialSortDir);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortkey, sortDir]);

  const handleSort = (key: keyof T) => {
    const nextDir =
      sortkey === key ? (sortDir === "asc" ? "desc" : "asc") : "asc";
    const nextKey = sortkey === key ? sortkey : key;
    setSortkey(nextKey);
    setSortDir(nextDir);
    onSortChange?.({ key: nextKey, dir: nextDir });
  };

  const sortedRows =
    sortkey !== undefined
      ? [...rows].sort((a, b) => {
          const aVal = a[sortkey];
          const bVal = b[sortkey];
          let cmp: number;
          if (typeof aVal === "number" && typeof bVal === "number")
            cmp = aVal - bVal;
          else cmp = String(aVal).localeCompare(String(bVal));
          return sortDir === "asc" ? cmp : -cmp;
        })
      : rows;

  const totalRows = sortedRows.length;
  const totalPages = pageSize ? Math.ceil(totalRows / pageSize) : 1;
  const pageIndex = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedRows = pageSize
    ? sortedRows.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    : sortedRows;
  const displayRows = paginatedRows;

  return (
    <div
      style={{
        overflow: "auto",
        background: "#ffffff",
        borderRadius: "8px",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
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
                onClick={() => handleSort(c.key as keyof T)}
                title={`Click to sort by ${c.header}`}
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
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {c.header}
                  {sortkey === c.key ? (
                    sortDir === "asc" ? (
                      <ArrowDownWideNarrow size={16} style={{ opacity: 1 }} />
                    ) : (
                      <ArrowUpNarrowWide size={16} style={{ opacity: 1 }} />
                    )
                  ) : (
                    <ArrowUpDown size={16} style={{ opacity: 0.5 }} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "32px 16px",
                  color: "#6b7280",
                  textAlign: "center",
                }}
              >
                No data available.
              </td>
            </tr>
          ) : (
            displayRows.map((r, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? "#ffffff" : "#f9fafb",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    i % 2 === 0 ? "#ffffff" : "#f9fafb")
                }
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    style={{
                      padding: dense ? "10px 16px" : "14px 16px",
                      borderBottom:
                        i === displayRows.length - 1
                          ? "none"
                          : "1px solid #e5e7eb",
                      whiteSpace: "nowrap",
                      color: "#111827",
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
      {pageSize != null && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderTop: "1px solid #e5e7eb",
            background: "#f9fafb",
            fontSize: 14,
            color: "#4b5563",
          }}
        >
          <span>
            Showing {(pageIndex - 1) * pageSize + 1}–{Math.min(pageIndex * pageSize, totalRows)} of {totalRows}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={pageIndex <= 1}
              style={{
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: pageIndex <= 1 ? "#f3f4f6" : "#fff",
                cursor: pageIndex <= 1 ? "not-allowed" : "pointer",
                color: pageIndex <= 1 ? "#9ca3af" : "#374151",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <span style={{ padding: "0 12px", fontWeight: 500 }}>
              Page {pageIndex} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageIndex >= totalPages}
              style={{
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: pageIndex >= totalPages ? "#f3f4f6" : "#fff",
                cursor: pageIndex >= totalPages ? "not-allowed" : "pointer",
                color: pageIndex >= totalPages ? "#9ca3af" : "#374151",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
