import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/User/GetProfile"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      <div className="card">
        <img src={profile.image || "https://via.placeholder.com/150"} alt="Profile" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text">Email: {profile.email}</p>
          <p className="card-text">Role: {profile.role}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;