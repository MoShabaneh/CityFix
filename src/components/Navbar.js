import { useNavigate } from "react-router-dom";
import testImge from "./images/catasters.jpeg";
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="logo" style={{ marginLeft: "2em" }}>
        CityFix
      </h1>
      <img
        src={testImge}
        alt="Profile"
        className="profile-img "
        style={{ marginRight: "2em", width: "35px", height: "35px" }}
        onClick={() => navigate("/profile")}
      />
    </nav>
  );
}

export default Navbar;
