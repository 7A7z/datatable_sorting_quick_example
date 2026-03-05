import { useState } from "react";
import DataTable from "./components/DataTable";
import type { Column, SortState } from "./components/DataTable";
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
  { key: "Date", header: "Date" },
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
  { id: 1, Street1: "101 Pine St", Street2: "Apt 1A", City: "San Francisco", State: 4, Zipcode: "94101" },
  { id: 2, Street1: "456 Elm St", Street2: "Suite 5A", City: "Los Angeles", State: 2, Zipcode: "90001" },
  { id: 3, Street1: "789 Oak St", Street2: "Apt 3B", City: "Chicago", State: 3, Zipcode: "60601" },
  { id: 4, Street1: "101 Pine St", Street2: "Apt 4A", City: "San Francisco", State: 4, Zipcode: "94101" },
  { id: 5, Street1: "123 Main St", Street2: "Apt 4B", City: "New York", State: 1, Zipcode: "10001" },
  { id: 6, Street1: "789 Oak St", Street2: "Apt 2C", City: "Chicago", State: 3, Zipcode: "60601" },
  { id: 7, Street1: "200 Cedar Ln", Street2: "Unit 7", City: "Houston", State: 5, Zipcode: "77001" },
  { id: 8, Street1: "321 Maple Dr", Street2: "Suite 8", City: "Phoenix", State: 6, Zipcode: "85001" },
  { id: 9, Street1: "555 Birch Ave", Street2: "Apt 9C", City: "Philadelphia", State: 7, Zipcode: "19101" },
  { id: 10, Street1: "777 Spruce Rd", Street2: "Floor 2", City: "San Antonio", State: 5, Zipcode: "78201" },
  { id: 11, Street1: "888 Willow Way", Street2: "Unit 11", City: "San Diego", State: 2, Zipcode: "92101" },
  { id: 12, Street1: "999 Ash Blvd", Street2: "Apt 12B", City: "Dallas", State: 5, Zipcode: "75201" },
  { id: 13, Street1: "100 River St", Street2: "Suite 13", City: "Austin", State: 5, Zipcode: "73301" },
  { id: 14, Street1: "222 Lake Ave", Street2: "Unit 14", City: "Jacksonville", State: 8, Zipcode: "32099" },
  { id: 15, Street1: "333 Hill Rd", Street2: "Apt 15", City: "Fort Worth", State: 5, Zipcode: "76101" },
  { id: 16, Street1: "444 Park Pl", Street2: "Suite 16", City: "Columbus", State: 9, Zipcode: "43004" },
  { id: 17, Street1: "555 Valley View", Street2: "Unit 17", City: "Charlotte", State: 10, Zipcode: "28201" },
  { id: 18, Street1: "666 Summit Dr", Street2: "Apt 18A", City: "Indianapolis", State: 11, Zipcode: "46201" },
  { id: 19, Street1: "777 Harbor Way", Street2: "Suite 19", City: "Seattle", State: 12, Zipcode: "98101" },
  { id: 20, Street1: "888 Bridge St", Street2: "Unit 20", City: "Denver", State: 13, Zipcode: "80201" },
  { id: 21, Street1: "999 Canyon Rd", Street2: "Apt 21", City: "Boston", State: 14, Zipcode: "02101" },
  { id: 22, Street1: "111 Plaza Dr", Street2: "Suite 22", City: "Nashville", State: 15, Zipcode: "37201" },
  { id: 23, Street1: "222 Grove St", Street2: "Unit 23", City: "Detroit", State: 16, Zipcode: "48201" },
  { id: 24, Street1: "333 Ridge Ave", Street2: "Apt 24B", City: "Portland", State: 17, Zipcode: "97201" },
  { id: 25, Street1: "444 Meadow Ln", Street2: "Suite 25", City: "Las Vegas", State: 6, Zipcode: "89101" },
  { id: 26, Street1: "555 Sunset Blvd", Street2: "Unit 26", City: "Miami", State: 8, Zipcode: "33101" },
  { id: 27, Street1: "666 Forest Dr", Street2: "Apt 27", City: "Atlanta", State: 18, Zipcode: "30301" },
  { id: 28, Street1: "777 Bay St", Street2: "Suite 28", City: "Tampa", State: 8, Zipcode: "33601" },
  { id: 29, Street1: "888 Mountain View", Street2: "Unit 29", City: "Minneapolis", State: 19, Zipcode: "55401" },
  { id: 30, Street1: "999 Ocean Ave", Street2: "Apt 30", City: "Baltimore", State: 20, Zipcode: "21201" },
];

function getSortLabel(key: string, dir: "asc" | "desc"): string {
  const label = columns.find((c) => c.key === key)?.header ?? key;
  return `Sorted by ${label} ${dir === "asc" ? "↑" : "↓"}`;
}

function getAddressSortLabel(key: string, dir: "asc" | "desc"): string {
  const label = AdressColumns.find((c) => c.key === key)?.header ?? key;
  return `Sorted by ${label} ${dir === "asc" ? "↑" : "↓"}`;
}

function App() {
  const [userSort, setUserSort] = useState<SortState<Employee> | null>({
    key: "id",
    dir: "asc",
  });
  const [addressSort, setAddressSort] = useState<SortState<Adress> | null>({
    key: "id",
    dir: "asc",
  });

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
          Users
        </h2>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#6b7280",
            margin: "0 0 0.5rem 0",
            marginLeft: "auto",
          }}
        >
          {userSort ? getSortLabel(userSort.key as string, userSort.dir) : "—"}
        </h2>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        initialSortKey={userSort?.key}
        initialSortDir={userSort?.dir}
        onSortChange={setUserSort}
      />

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
          Addresses
        </h2>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#6b7280",
            margin: "0 0 0.5rem 0",
            marginLeft: "auto",
          }}
        >
          {addressSort ? getAddressSortLabel(addressSort.key as string, addressSort.dir) : "—"}
        </h2>
      </div>
      <DataTable
        columns={AdressColumns}
        rows={Adressrows}
        initialSortKey={addressSort?.key}
        initialSortDir={addressSort?.dir}
        onSortChange={setAddressSort}
        pageSize={10}
      />
    </div>
  );
}

export default App;
