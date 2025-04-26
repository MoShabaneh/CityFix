import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Details() {
  const { id } = useParams(); // Get the hazard ID from the URL
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIssue, setEditedIssue] = useState(null);

  // Fetch hazard details from the API
  const fetchIssueDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Hazard/ViewHazard/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch hazard details");
      }
      const data = await response.json();
      setIssue(data);
      setEditedIssue(data);
    } catch (error) {
      console.error("Error fetching hazard details:", error);
    }
  };

  useEffect(() => {
    fetchIssueDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Hazard/UpdateHazard/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedIssue),
      });

      if (!response.ok) {
        throw new Error("Failed to update hazard details");
      }

      const updatedData = await response.json();
      setIssue(updatedData);
      setIsEditing(false);
      alert("Hazard updated successfully!");
    } catch (error) {
      console.error("Error updating hazard details:", error);
      alert("Failed to update hazard. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedIssue({ ...editedIssue, [name]: value });
  };

  const handleAction = async (action) => {
    try {
      let updatedStatus;
      if (action === "Accept") updatedStatus = 1; // In Progress
      else if (action === "Reject") updatedStatus = -1; // Rejected
      else if (action === "Complete") updatedStatus = 2; // Completed
      else if (action === "Cancel") updatedStatus = -2; // Canceled

      const response = await fetch(`http://localhost:5000/api/Hazard/UpdateHazard/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editedIssue, status: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update hazard status");
      }

      const updatedData = await response.json();
      setIssue(updatedData);
      alert(`Hazard status updated to ${action}`);
    } catch (error) {
      console.error("Error updating hazard status:", error);
      alert("Failed to update hazard status. Please try again.");
    }
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4" style={{ marginBottom: "30px" }}>
      <button onClick={handleBack} className="btn btn-secondary mb-4">
        Back
      </button>

      <div className="card p-4">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <img
              src={issue.urlimage || "https://via.placeholder.com/150"}
              className="img-fluid rounded"
              alt={issue.type}
            />
          </div>

          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label">
                <strong>Type</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="type"
                value={editedIssue.type}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>City</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={editedIssue.city}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Address</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={editedIssue.address}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Description</strong>
              </label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={editedIssue.description}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Severity</strong>
              </label>
              <select
                className="form-select"
                name="severity"
                value={editedIssue.severity}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="mb-3 d-flex justify-content-start">
              {!isEditing ? (
                <button className="btn btn-primary me-2" onClick={handleEdit}>
                  Edit
                </button>
              ) : (
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>

            <div className="mb-3 d-flex justify-content-start">
              {issue.status === 0 && ( // Under Review
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleAction("Accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction("Reject")}
                  >
                    Reject
                  </button>
                </>
              )}

              {issue.status === 1 && ( // In Progress
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleAction("Complete")}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction("Cancel")}
                  >
                    Cancel
                  </button>
                </>
              )}

              {issue.status === 2 && ( // Completed
                <p className="text-muted">
                  This issue is completed. No further actions are needed.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}