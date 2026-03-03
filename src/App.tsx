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
  { id: 1, name: "Alice Johnson", department: "Engineering", role: "Senior Engineer", salary: 120000, status: "Active" },
  { id: 2, name: "Bob Smith", department: "Design", role: "UX Designer", salary: 95000, status: "Active" },
  { id: 3, name: "Carol White", department: "Marketing", role: "Marketing Lead", salary: 88000, status: "Inactive" },
  { id: 4, name: "David Lee", department: "Engineering", role: "Junior Engineer", salary: 75000, status: "Active" },
  { id: 5, name: "Eva Martinez", department: "HR", role: "HR Manager", salary: 82000, status: "Active" },
  { id: 6, name: "Frank Brown", department: "Finance", role: "Financial Analyst", salary: 91000, status: "Inactive" },
];

function App() {
  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ marginBottom: "2rem", textAlign: "left" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: "0 0 0.5rem 0" }}>Employee Directory</h2>
        <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>Manage your team members and their account statuses here.</p>
      </div>
      <DataTable columns={columns} rows={rows} />

      <div style={{ marginTop: "3rem", marginBottom: "2rem", textAlign: "left" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", margin: "0 0 0.5rem 0" }}>Dense Mode</h2>
        <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>A more compact view for high data density.</p>
      </div>
      <DataTable columns={columns} rows={rows} dense />

      <div style={{ marginTop: "3rem", marginBottom: "2rem", textAlign: "left" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", margin: "0 0 0.5rem 0" }}>Empty State</h2>
        <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>How the table appears when no data is provided.</p>
      </div>
      <DataTable columns={columns} rows={[]} />
    </div>
  );
}

export default App;
