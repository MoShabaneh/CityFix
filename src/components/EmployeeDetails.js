import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/Employee/GetEmployeeById?employeeId=${id}`); // Replace with your API base URL
        if (!response.ok) {
          throw new Error("Failed to fetch employee details");
        }
        const data = await response.json();
        setEmployee(data);
        setSelectedSection(data.section);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSaveSection = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Employee/UpdateEmployeeSection`, { // Replace with your API base URL
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId: id, section: selectedSection }),
      });
      if (!response.ok) {
        throw new Error("Failed to update section");
      }
      setEmployee((prev) => ({ ...prev, section: selectedSection }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedSection(employee.section);
    setIsEditing(false);
  };

  const toggleBlockStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Employee/ToggleBlockStatus`, { // Replace with your API base URL
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to toggle block status");
      }
      setEmployee((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
      alert(
        employee.blocked
          ? "Employee has been unblocked."
          : "Employee has been blocked."
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  if (!employee) return <div className="text-center">Loading...</div>;

  return (
    <div className="container">
      <h2 className="mb-4">Employee Details</h2>

      <div className="text-center mb-4">
        <img src={employee.image} alt="User" className="rounded-circle profile-img" />
      </div>

      <ul className="list-group">
        {Object.entries(employee).map(([key, value]) => {
          if (key === "image" || key === "blocked") return null;

          return (
            <li
              key={key}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>
              {key === "section" && isEditing ? (
                <select
                  className="form-select w-50"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="water">Water</option>
                  <option value="electricity">Electricity</option>
                  <option value="roads">Roads</option>
                  <option value="communication">Communication</option>
                </select>
              ) : (
                value
              )}
            </li>
          );
        })}
      </ul>

      <div className="d-flex gap-2 mt-3">
        {isEditing ? (
          <>
            <button
              className="btn btn-success w-100"
              onClick={handleSaveSection}
            >
              Save Section
            </button>
            <button
              className="btn btn-warning w-100"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary w-100"
            onClick={() => setIsEditing(true)}
          >
            Edit Section
          </button>
        )}

        <button
          className={`btn w-100 ${
            employee.blocked ? "btn-success" : "btn-danger"
          }`}
          onClick={toggleBlockStatus}
        >
          {employee.blocked ? "Unblock Employee" : "Block Employee"}
        </button>
      </div>

      <button
        className="btn btn-secondary mt-3 w-100"
        onClick={() => navigate("/employees")}
      >
        Back to Employees
      </button>
    </div>
  );
}