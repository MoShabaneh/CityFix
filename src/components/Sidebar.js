import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <ul className="list-unstyled">
        {user && user.rule === "admin" && (
          <li className="fw-bold" onClick={() => navigate("/under-review")}>
            <i className="bi bi-hourglass-split me-2"></i>Under Review
          </li>
        )}

        <li className="fw-bold" onClick={() => navigate("/in-process")}>
          <i className="bi bi-tools me-2"></i>In Process
        </li>
        <li className="fw-bold" onClick={() => navigate("/completed")}>
          <i className="bi bi-check-circle me-2"></i>Completed
        </li>

        {user && user.rule === "admin" && (
          <li className="fw-bold" onClick={() => navigate("/employees")}>
            <i className="bi bi-people me-2"></i>Employees
          </li>
        )}

        {user && (
          <li
            className="fw-bold text-danger mt-3"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
