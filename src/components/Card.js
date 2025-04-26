import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Card({ data }) {
  const issue = data;

  const navigate = useNavigate();
  return (
    <div
      className="card mb-3 align-content-center"
      style={{
        maxWidth: "330px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        borderRadius: "15px",
      }}
    >
      <img src={issue.image} className="card-img-top" alt={issue.type || issue.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{issue.type || issue.name}</h5>
        <p className="card-text">
          <i className="bi bi-geo-alt-fill"></i> {issue.city || "Unknown"}
          <br />
          {issue.severity && (
            <span
              className={`badge ${
                issue.severity === "Hard"
                  ? "bg-danger"
                  : issue.severity === "Medium"
                  ? "bg-warning"
                  : "bg-success"
              }`}
            >
              {issue.severity}
            </span>
          )}
          {issue.position && <span className="d-block mt-2">Position: {issue.position}</span>}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/details/${issue.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}