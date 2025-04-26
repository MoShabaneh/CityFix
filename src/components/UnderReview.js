import { useEffect, useState } from "react";
import Card from "./Card";

function UnderReview() {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Hazard/ViewHazard/UnderView"); // Replace with your API base URL
      if (!response.ok) {
        throw new Error("Failed to fetch issues under review");
      }
      const data = await response.json();
      const formattedData = data.map((hazard) => ({
        id: hazard.hazardId,
        image: hazard.image || "https://via.placeholder.com/150", // Default image if none exists
        type: hazard.title,
        city: hazard.city || "Unknown", // Default value if city is not provided
        severity: hazard.priority || "Unknown", // Default value if priority is not provided
      }));
      setIssues(formattedData);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-4">
      <h2>Hazards - Under Review</h2>
      <div className="row">
        {issues.map((issue) => (
          <div key={issue.id} className="col-md-4">
            <Card data={issue} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnderReview;