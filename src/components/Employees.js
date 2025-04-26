import { useEffect, useState } from "react";
import Card from "./Card";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Employee/GetAllEmployees"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      const formattedData = data.map((employee) => ({
        id: employee.id,
        image: employee.image || "https://via.placeholder.com/150",
        name: employee.name,
        position: employee.position || "Unknown",
      }));
      setEmployees(formattedData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Employees</h2>
      <div className="row">
        {employees.map((employee) => (
          <div key={employee.id} className="col-md-4">
            <Card data={employee} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employees;