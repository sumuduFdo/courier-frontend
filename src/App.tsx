import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import {LoginPage, loginActions} from "./components/pages/Login";

import {
  RegisterPage,
  actions as registerAction,
} from "./components/pages/Register";
import ErrorPage from "./components/pages/Error";
import Dashboard from "./components/Dashboard";
import Index from "./components/pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginActions,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
