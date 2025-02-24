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
import MenuContracts from "./pages/MenuContracts";
import MenuComplaints from "./pages/MenuComplaints";
import Complaint from "./pages/complaint";
import AdminRoute from "./pages/AdminRoute";
import MenuClients from "./pages/MenuClients";
import MenuEmployees from "./pages/MenuEmployees";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedLayout />}>
              <Route index element={<Home />} />
              <Route path="admin" element={<AdminRoute />}>
                <Route index element={<MenuAdmin />} />
                <Route path="permissions" element={<UserPermissions />} />
                <Route path="employees" element={<Employees />} />
                <Route path="clients" element={<Clients />} />
                <Route path="services" element={<Services />} />
                <Route path="contracts" element={<Contracts />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="status" element={<Status />} />
              </Route>
              <Route path="clients" element={<MenuClients />} />
              <Route path="employee" element={<MenuEmployees />} />
              <Route path="contracts" element={<MenuContracts />} />
              <Route path="contracts/complaints" element={<MenuComplaints />} />
              <Route path="contracts/complaints/complaint" element={<Complaint />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
