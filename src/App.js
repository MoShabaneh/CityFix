import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UnderReview from "./components/UnderReview";
import InProgress from "./components/InProcess";
import Completed from "./components/Completed";
import Employees from "./components/Employees";
import Profile from "./components/Profile";
import "./components/style/style.css";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">
      {!isLoginPage && (
        <>
          <Navbar />
          <div className="main d-flex vh-100">
            <Sidebar />
            <div className="content-container">
              <div className="content">
                <Routes>
                  <Route path="/under-review" element={<UnderReview />} />
                  <Route path="/in-progress" element={<InProgress />} />
                  <Route path="/completed" element={<Completed />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {!isLoginPage && (
                <>
                  <Navbar />
                  <div className="main d-flex vh-100">
                    <Sidebar />
                    <MainContent />
                  </div>
                </>
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;