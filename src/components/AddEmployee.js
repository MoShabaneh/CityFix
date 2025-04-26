import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    section: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulated API call
    console.log("Employee Added:", formData);
    alert("Employee added successfully!");

    navigate("/employees");
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {["firstName", "middleName", "lastName"].map((field, index) => (
            <div className="col-md-4" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="row g-3 mt-3">
          {["email", "phone", "city"].map((field, index) => (
            <div className="col-md-4" key={index}>
              <input
                type={field === "email" ? "email" : "text"}
                className="form-control"
                placeholder={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <select
              className="form-select"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            >
              <option value="">Select Section</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="roads">Roads</option>
              <option value="communication">Communication</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Repeat Password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3 w-100">
          Add Employee
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-2 w-100"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
