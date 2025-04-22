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
import Complaint from "./pages/complaint"
import AdminRoute from "./pages/AdminRoute";
import MenuClients from "./pages/MenuClients";
import MenuEmployees from "./pages/MenuEmployees";
import NewForm from "./pages/NewForm";
import UpdateTable from "./pages/UpdateTable";
import React from "react";
import { ClientProvider } from "./context/ClientContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ComplaintsProvider } from "./context/ComplaintsContext";
import { UserPermissionsProvider } from "./context/UserPermissionsContext";
import { ServicesProvider } from "./context/ServicesContext";
import { ContractProvider } from "./context/ContractsContext";
import { StatusProvider } from "./context/StatusContext";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";

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
        <BreadcrumbProvider>
          <ClientProvider>
            <EmployeeProvider>
              <ComplaintsProvider>
                <UserPermissionsProvider>
                  <ServicesProvider>
                    <ContractProvider>
                      <StatusProvider>
                        <BrowserRouter>
                          <Routes>
                            <Route path="/" element={<Login />} />
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
                              <Route path="employees" element={<MenuEmployees />} />
                              <Route path="employee/clients" element={<MenuClients />} />
                              <Route path="contracts" element={<MenuContracts />} />
                              <Route path="contracts/complaints" element={<MenuComplaints />} />
                              <Route path="contracts/complaints/complaint" element={<Complaint />} />
                            </Route>
                          </Routes>
                        </BrowserRouter>
                      </StatusProvider>
                    </ContractProvider>
                  </ServicesProvider>
                </UserPermissionsProvider>
              </ComplaintsProvider>
            </EmployeeProvider>
          </ClientProvider>
        </BreadcrumbProvider>
      </UserProvider>
    </>
  );
}

export default App;
