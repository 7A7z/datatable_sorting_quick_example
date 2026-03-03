import { useState } from "react";
import DataTable from "./components/DataTable";
import type { Column } from "./components/DataTable";
import "./App.css";

type Employee = {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  status: string;
};

const employeeKeys: (keyof Employee)[] = ["id", "name", "department", "role", "salary", "status"];

const columns: Column<Employee>[] = [
  { key: "id", header: "ID", width: 60 },
  { key: "name", header: "Name", width: 180 },
  { key: "department", header: "Department" },
  { key: "role", header: "Role" },
  {
    key: "salary",
    header: "Salary",
    render: (row) => `$${row.salary.toLocaleString()}`,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          color: row.status === "Active" ? "#065f46" : "#4b5563",
          background: row.status === "Active" ? "#d1fae5" : "#e5e7eb",
          fontWeight: 600,
        }}
      >
        {row.status}
      </span>
    ),
  },
];

const rows: Employee[] = [
  { id: 5, name: "Eva Martinez", department: "HR", role: "HR Manager", salary: 82000, status: "Active" },
  { id: 2, name: "Bob Smith", department: "Design", role: "UX Designer", salary: 95000, status: "Active" },
  { id: 6, name: "Frank Brown", department: "Finance", role: "Financial Analyst", salary: 91000, status: "Inactive" },
  { id: 1, name: "Alice Johnson", department: "Engineering", role: "Senior Engineer", salary: 120000, status: "Active" },
  { id: 3, name: "Carol White", department: "Marketing", role: "Marketing Lead", salary: 88000, status: "Inactive" },
  { id: 4, name: "David Lee", department: "Engineering", role: "Junior Engineer", salary: 75000, status: "Active" },
];

function App() {
  const [sortKey, setSortKey] = useState<keyof Employee>("id");

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ marginBottom: "2rem", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: "0 0 0.5rem 0" }}>Sorted</h2>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as keyof Employee)}
          style={{ 
            padding: "8px 16px", 
            borderRadius: "8px", 
            border: "1px solid #e5e7eb", 
            fontSize: "14px", 
            backgroundColor: "#ffffff",
            color: "#111827",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            cursor: "pointer",
            outline: "none"
          }}
        >
          {employeeKeys.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <DataTable columns={columns} rows={rows} sortkey={sortKey} />

      <div style={{ marginTop: "3rem", marginBottom: "2rem", textAlign: "left" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: "0 0 0.5rem 0" }}>Unsorted</h2>
      </div>
      <DataTable columns={columns} rows={rows} />

    </div>
  );
}

export default App;
