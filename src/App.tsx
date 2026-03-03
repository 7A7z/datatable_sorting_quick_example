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
  Date: string;
};

type Adress = {
  id: number;
  Street1: string;
  Street2: string;
  City: string;
  State: number;
  Zipcode: string;
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

const AdressColumns: Column<Adress>[] = [
  { key: "id", header: "ID", width: 60 },
  { key: "Street1", header: "Street1", width: 180 },
  { key: "Street2", header: "Street2" },
  { key: "City", header: "City" },
  { key: "State", header: "State" },
  { key: "Zipcode", header: "Zipcode" },
];

const rows: Employee[] = [
  {
    id: 5,
    name: "Eva Martinez",
    department: "HR",
    role: "HR Manager",
    salary: 82000,
    status: "Active",
    Date: "2024-03-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    department: "Design",
    role: "UX Designer",
    salary: 95000,
    status: "Active",
    Date: "2023-11-02",
  },
  {
    id: 6,
    name: "Frank Brown",
    department: "Finance",
    role: "Financial Analyst",
    salary: 91000,
    status: "Inactive",
    Date: "2024-01-20",
  },
  {
    id: 1,
    name: "Alice Johnson",
    department: "Engineering",
    role: "Senior Engineer",
    salary: 120000,
    status: "Active",
    Date: "2022-06-10",
  },
  {
    id: 3,
    name: "Carol White",
    department: "Marketing",
    role: "Marketing Lead",
    salary: 88000,
    status: "Inactive",
    Date: "2023-08-25",
  },
  {
    id: 4,
    name: "David Lee",
    department: "Engineering",
    role: "Junior Engineer",
    salary: 75000,
    status: "Active",
    Date: "2024-07-01",
  },
];

const Adressrows: Adress[] = [
  {
    id: 5,
    Street1: "123 Main St",
    Street2: "Apt 4B",
    City: "New York",
    State: 1,
    Zipcode: "10001",
  },
  {
    id: 2,
    Street1: "456 Elm St",
    Street2: "Suite 5A",
    City: "Los Angeles",
    State: 2,
    Zipcode: "90001",
  },
  {
    id: 6,
    Street1: "789 Oak St",
    Street2: "Apt 2C",
    City: "Chicago",
    State: 3,
    Zipcode: "60601",
  },
  {
    id: 1,
    Street1: "101 Pine St",
    Street2: "Apt 1A",
    City: "San Francisco",
    State: 4,
    Zipcode: "94101",
  },
  {
    id: 3,
    Street1: "789 Oak St",
    Street2: "Apt 3B",
    City: "Chicago",
    State: 3,
    Zipcode: "60601",
  },
  {
    id: 4,
    Street1: "101 Pine St",
    Street2: "Apt 4A",
    City: "San Francisco",
    State: 4,
    Zipcode: "94101",
  },
];

function App() {
  return (
    <div style={{ padding: "0 16px" }}>
      <div
        style={{
          marginBottom: "2rem",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 0.5rem 0",
          }}
        >
          Sorted
        </h2>
      </div>
      <DataTable columns={columns} rows={rows} />

      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 0.5rem 0",
          }}
        >
          Sorted
        </h2>
      </div>
      <DataTable columns={AdressColumns} rows={Adressrows} />
    </div>
  );
}

export default App;
