import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIssue, setEditedIssue] = useState(null);

  const fetchIssueDetails = async () => {
    try {
      const data = {
        id,
        image:
          "https://img.freepik.com/free-photo/vertical-shot-road-with-magnificent-mountains-blue-sky-captured-california_181624-44891.jpg?t=st=1743061145~exp=1743064745~hmac=f30667e8a003d8c7da7919906477e7874fb8f0cdcfa31f8ce98b9f162275ce52&w=740",
        type: "Road Repair",
        city: "Ramallah",
        severity: "Medium",
        address: "123 Main St",
        description: "The road needs repair due to severe damage.",
        status: "Under Review", // Change this status to see different buttons
      };

      setIssue(data);
      setEditedIssue(data);
    } catch (error) {
      console.error("Error fetching issue details:", error);
    }
  };

  useEffect(() => {
    fetchIssueDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIssue(editedIssue);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving issue details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedIssue({ ...editedIssue, [name]: value });
  };

  const handleAction = (action) => {
    if (action === "Accept") {
      // Handle accept action (e.g., send to backend)
    } else if (action === "Reject") {
      // Handle reject action
    } else if (action === "Complete") {
      // Handle complete action
    } else if (action === "Cancel") {
      // Handle cancel action
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
              src={issue.image}
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
              {issue.status === "Under Review" && (
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

              {issue.status === "In Process" && (
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

              {issue.status === "Completed" && (
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
