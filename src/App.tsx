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

type Department = {
  id: number;
  name: string;
  location: string;
  head: string;
  employees: number;
};

type Division = {
  id: number;
  name: string;
  region: string;
  manager: string;
  budget: number;
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

const departmentColumns: Column<Department>[] = [
  { key: "id", header: "ID", width: 50 },
  { key: "name", header: "Department" },
  { key: "location", header: "Location" },
  { key: "head", header: "Head" },
  {
    key: "employees",
    header: "Employees",
    render: (row) => row.employees.toLocaleString(),
  },
];

const divisionColumns: Column<Division>[] = [
  { key: "id", header: "ID", width: 50 },
  { key: "name", header: "Division" },
  { key: "region", header: "Region" },
  { key: "manager", header: "Manager" },
  {
    key: "budget",
    header: "Budget",
    render: (row) => `$${row.budget.toLocaleString()}`,
  },
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

const departmentRows: Department[] = [
  { id: 1, name: "Engineering", location: "San Francisco", head: "Alice Johnson", employees: 120 },
  { id: 2, name: "Design", location: "New York", head: "Bob Smith", employees: 45 },
  { id: 3, name: "Marketing", location: "Chicago", head: "Carol White", employees: 60 },
  { id: 4, name: "Sales", location: "Dallas", head: "David Lee", employees: 80 },
  { id: 5, name: "HR", location: "Seattle", head: "Eva Martinez", employees: 25 },
  { id: 6, name: "Finance", location: "Boston", head: "Frank Brown", employees: 35 },
  { id: 7, name: "Support", location: "Phoenix", head: "Grace Kim", employees: 50 },
  { id: 8, name: "Operations", location: "Atlanta", head: "Henry Clark", employees: 40 },
  { id: 9, name: "IT", location: "Austin", head: "Irene Turner", employees: 30 },
  { id: 10, name: "Legal", location: "San Diego", head: "Jack Wilson", employees: 15 },
  { id: 11, name: "Engineering", location: "New York", head: "Karen Young", employees: 90 },
  { id: 12, name: "Design", location: "Seattle", head: "Liam Davis", employees: 32 },
  { id: 13, name: "Marketing", location: "Austin", head: "Mia Roberts", employees: 48 },
  { id: 14, name: "Sales", location: "Chicago", head: "Noah Scott", employees: 70 },
  { id: 15, name: "HR", location: "Dallas", head: "Olivia Green", employees: 22 },
  { id: 16, name: "Finance", location: "San Francisco", head: "Paul Adams", employees: 38 },
  { id: 17, name: "Support", location: "Boston", head: "Quinn Baker", employees: 44 },
  { id: 18, name: "Operations", location: "Phoenix", head: "Ruby Allen", employees: 36 },
  { id: 19, name: "IT", location: "Atlanta", head: "Sam Carter", employees: 28 },
  { id: 20, name: "Legal", location: "Chicago", head: "Tina Perez", employees: 18 },
];

const divisionRows: Division[] = [
  { id: 1, name: "North America", region: "Americas", manager: "Uma Patel", budget: 2500000 },
  { id: 2, name: "Europe West", region: "EMEA", manager: "Victor Stone", budget: 1800000 },
  { id: 3, name: "Europe East", region: "EMEA", manager: "Wendy Shaw", budget: 1500000 },
  { id: 4, name: "APAC North", region: "APAC", manager: "Xavier Lee", budget: 1700000 },
  { id: 5, name: "APAC South", region: "APAC", manager: "Yara Chen", budget: 1600000 },
  { id: 6, name: "Latin America", region: "Americas", manager: "Zane Torres", budget: 1400000 },
  { id: 7, name: "Middle East", region: "EMEA", manager: "Amir Khan", budget: 1300000 },
  { id: 8, name: "Africa", region: "EMEA", manager: "Bella Okafor", budget: 1200000 },
  { id: 9, name: "Canada", region: "Americas", manager: "Carlos Ruiz", budget: 900000 },
  { id: 10, name: "US East", region: "Americas", manager: "Diana Ross", budget: 1100000 },
  { id: 11, name: "US West", region: "Americas", manager: "Ethan Fox", budget: 1150000 },
  { id: 12, name: "Nordics", region: "EMEA", manager: "Freya Lund", budget: 800000 },
  { id: 13, name: "Benelux", region: "EMEA", manager: "Gustav Janssen", budget: 850000 },
  { id: 14, name: "Central Europe", region: "EMEA", manager: "Hanna Novak", budget: 900000 },
  { id: 15, name: "Oceania", region: "APAC", manager: "Ian Taylor", budget: 950000 },
  { id: 16, name: "Southeast Asia", region: "APAC", manager: "Jia Li", budget: 1050000 },
  { id: 17, name: "Greater China", region: "APAC", manager: "Kai Wang", budget: 2000000 },
  { id: 18, name: "India", region: "APAC", manager: "Lakshmi Rao", budget: 1450000 },
  { id: 19, name: "Mexico", region: "Americas", manager: "Miguel Lopez", budget: 700000 },
  { id: 20, name: "Brazil", region: "Americas", manager: "Natalia Souza", budget: 950000 },
];

const cityOptions = [
  "All",
  ...Array.from(new Set(Adressrows.map((a) => a.City))).sort(),
];

const departmentOptions = [
  "All",
  ...Array.from(new Set(departmentRows.map((d) => d.name))).sort(),
];

const divisionRegionOptions = [
  "All",
  ...Array.from(new Set(divisionRows.map((d) => d.region))).sort(),
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
  const [cityFilter, setCityFilter] = useState<string>("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [divisionRegionFilter, setDivisionRegionFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState<boolean>(true);

  const filteredAddressRows =
    cityFilter === "All"
      ? Adressrows
      : Adressrows.filter((r) => r.City === cityFilter);

  const filteredDepartmentRows =
    departmentFilter === "All"
      ? departmentRows
      : departmentRows.filter((r) => r.name === departmentFilter);

  const filteredDivisionRows =
    divisionRegionFilter === "All"
      ? divisionRows
      : divisionRows.filter((r) => r.region === divisionRegionFilter);

  const totalRecordsAll =
    rows.length + Adressrows.length + departmentRows.length + divisionRows.length;
  const totalRecordsFiltered =
    rows.length +
    filteredAddressRows.length +
    filteredDepartmentRows.length +
    filteredDivisionRows.length;

  return (
    <div
      style={{
        padding: "0 2px",
        minHeight: "100vh",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Filters
        </h1>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            background: "#020617",
            color: "#f9fafb",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>
      {showFilters && (
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#e5e7eb",
            }}
          >
            <span>City</span>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #4b5563",
                background: "#020617",
                fontSize: "0.875rem",
                color: "#f9fafb",
              }}
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#e5e7eb",
            }}
          >
            <span>Department</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #4b5563",
                background: "#020617",
                fontSize: "0.875rem",
                color: "#f9fafb",
              }}
            >
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#e5e7eb",
            }}
          >
            <span>Region</span>
            <select
              value={divisionRegionFilter}
              onChange={(e) => setDivisionRegionFilter(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #4b5563",
                background: "#020617",
                fontSize: "0.875rem",
                color: "#f9fafb",
              }}
            >
              {divisionRegionOptions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "#7c2d12",
            border: "1px solid #fb923c",
            borderRadius: 12,
            padding: "18px 20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ color: "#fed7aa", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Records (filtered)
          </div>
          <div style={{ color: "#ffedd5", fontSize: 34, fontWeight: 800, marginTop: 6 }}>
            {totalRecordsFiltered.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            background: "#1d4ed8",
            border: "1px solid #93c5fd",
            borderRadius: 12,
            padding: "18px 20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ color: "#bfdbfe", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Records (total)
          </div>
          <div style={{ color: "#eff6ff", fontSize: 34, fontWeight: 800, marginTop: 6 }}>
            {totalRecordsAll.toLocaleString()}
          </div>
        </div>
      </div>
      <div
        style={{
          marginBottom: "1rem",
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
          {userSort ? getSortLabel(userSort.key as string, userSort.dir) : "—"} • Total: {rows.length}
        </h2>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        initialSortKey={userSort?.key}
        initialSortDir={userSort?.dir}
        onSortChange={setUserSort}
        getRowKey={(row) => row.id}
      />

      <div
        style={{
          marginTop: "1rem",
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
          {addressSort ? getAddressSortLabel(addressSort.key as string, addressSort.dir) : "—"} • Total:{" "}
          {filteredAddressRows.length} / {Adressrows.length}
        </h2>
      </div>
      <DataTable
        columns={AdressColumns}
        rows={filteredAddressRows}
        initialSortKey={addressSort?.key}
        initialSortDir={addressSort?.dir}
        onSortChange={setAddressSort}
        pageSize={10}
        getRowKey={(row) => row.id}
      />

      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Departments
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                }}
              >
                Total: {filteredDepartmentRows.length} / {departmentRows.length}
              </span>
            </div>
          </div>
          <DataTable
            columns={departmentColumns}
            rows={filteredDepartmentRows}
            initialSortKey="id"
            initialSortDir="asc"
            getRowKey={(row) => row.id}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Divisions
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                }}
              >
                Total: {filteredDivisionRows.length} / {divisionRows.length}
              </span>
            </div>
          </div>
          <DataTable
            columns={divisionColumns}
            rows={filteredDivisionRows}
            initialSortKey="id"
            initialSortDir="asc"
            getRowKey={(row) => row.id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
