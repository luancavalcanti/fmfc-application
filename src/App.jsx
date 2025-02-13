import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import UserPermissions from "./pages/UserPermissions";
import MenuAdmin from "./pages/MenuAdmin";
import ProtectedLayout from "./components/ProtectedLayout";
import Employees from "./pages/Employees";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Contracts from "./pages/Contracts";
import Complaints from "./pages/Complaints";
import Status from "./pages/Status";
import MenuComplaints from "./pages/MenuComplaints";
import Complaint from "./pages/complaint";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedLayout />}>
              <Route index element={<Home />} />
              <Route path="admin" element={<MenuAdmin />} />
              <Route path="admin/permissions" element={<UserPermissions />} />
              <Route path="admin/employees" element={<Employees />} />
              <Route path="admin/clients" element={<Clients />} />
              <Route path="admin/services" element={<Services />} />
              <Route path="admin/contracts" element={<Contracts />} />
              <Route path="admin/complaints" element={<Complaints />} />
              <Route path="admin/status" element={<Status />} />
              <Route path="complaints" element={<MenuComplaints />} />
              <Route path="complaints/complaint" element={<Complaint />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
