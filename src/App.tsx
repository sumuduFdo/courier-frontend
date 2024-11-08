import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { LoginPage, loginActions } from "./components/pages/Login";

import {
  RegisterPage,
  actions as registerAction,
} from "./components/pages/Register";
import {Dashboard, fetchShipmentHandler} from "./components/Dashboard";
import Index from "./components/pages/Index";
import {
  NewShipmentPage,
  actions as newShipmentAction,
} from "./components/pages/NewShipment";
import {
  ShipmentDetail,
  loader as shipmentDetailLoader,
  actions as shipmentDetailAction
} from "./components/pages/ShipmentDetail";
import DashboardPage from "./components/pages/Dashboard";
import { ShipmentsListPage, shipmentsLoader } from "./components/pages/ShipmentsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    // errorElement: <ErrorPage />,
    children: [
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
        path: "/shipments",
        element: <DashboardPage />,
        children: [
          { index: true,  element: <ShipmentsListPage />, loader: shipmentsLoader },
          {
            path: "create-shipment",
            element: <NewShipmentPage />,
            loader: () => {
              return true;
            },
            action: newShipmentAction,
          },
          {
            path: ":shipmentId",
            element: <ShipmentDetail />,
            loader: shipmentDetailLoader,
            action: shipmentDetailAction
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
