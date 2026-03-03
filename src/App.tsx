import DataTable from "./components/DataTable";
import type { Column } from "./components/DataTable";

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
          color: row.status === "Active" ? "green" : "gray",
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
    <div style={{ padding: "32px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: 16 }}>Employee Table</h2>
      <DataTable columns={columns} rows={rows} />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Dense Mode</h2>
      <DataTable columns={columns} rows={rows} dense />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Empty State</h2>
      <DataTable columns={columns} rows={[]} />
    </div>
  );
}

export default App;
