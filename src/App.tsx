import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import RootLayout from "./components/pages/Root";
import { LoginPage, actions as loginAction } from "./components/pages/Login";
import { RegisterPage, actions as RegisterAction} from "./components/pages/Register";
import DashboardPage from "./components/pages/Dashboard";
import ErrorPage from "./components/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: RegisterAction,

      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
