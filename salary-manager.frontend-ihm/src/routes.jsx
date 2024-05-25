import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Employees from "./components/employes/Employees";
import Deductions from "./components/deductions/Deductions";
import Postes from "./components/postes/Postes";
import Paies from "./components/paies/Paies";
import Parametters from "./pages/Parametters";
import Helps from "./pages/Helps";
import { createBrowserRouter } from "react-router-dom";
import { connectedUser } from "./hooks/useUsers";
import ErrorPage from "./pages/ErrorPage";
import EmployeeDetails from "./pages/EmployeeDetails";
import ConnectionPage from "./pages/ConnectionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: connectedUser ? < Layout />: < ConnectionPage/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "employees", element: <Employees /> },
      { path: "employees/:employeeId", element: <EmployeeDetails /> },
      { path: "postes", element: <Postes /> },
      { path: "deductions", element: <Deductions /> },
      { path: "paies", element: <Paies /> },
      { path: "params", element: <Parametters /> },
      { path: "help", element: <Helps /> },
    ],
  },
]);

export default router;
