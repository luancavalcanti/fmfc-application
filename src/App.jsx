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
import NewForm from "./pages/NewForm";
import UpdateTable from "./pages/UpdateTable";
import React from "react";

function App() {
  const adminRoutes = [
    { path: "employees", component: <Employees /> },
    { path: "clients", component: <Clients /> },
    { path: "services", component: <Services /> },
    { path: "contracts", component: <Contracts /> },
    { path: "complaints", component: <Complaints /> },
    { path: "status", component: <Status /> },
    { path: "permissions", component: <UserPermissions /> },
  ];

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
                {adminRoutes.map(({ path, component }, index) => (
                  <React.Fragment key={index}>
                    <Route path={path} element={component} />
                    <Route path={`${path}/new`} element={<NewForm />} />
                    <Route path={`${path}/:id`} element={<UpdateTable />} />
                  </React.Fragment>
                ))}
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
