import { Route, Routes } from "react-router-dom";
import InProcess from "./InProcess";
import Completed from "./Completed";
import Profile from "./Profile";
import UnderReview from "./UnderReview";
import Details from "./Details";
import Employees from "./Employees";
import EmployeeDetails from "./EmployeeDetails";
import AddEmployee from "./AddEmployee";

function MainContent() {
  return (
    <div className="col-md-10 p-4 overflow-y-scroll mb-5 position-relative">
      <Routes>
        <Route path="/" element={<UnderReview />} />
        <Route path="/under-review" element={<UnderReview />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/in-process" element={<InProcess />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </div>
  );
}
export default MainContent;
