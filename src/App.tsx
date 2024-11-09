import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Index from "./components/Index";
import { Login, loginActions } from "./components/Login";
import { Register, actions as registerAction } from "./components/Register";
import {
  NewShipment,
  actions as newShipmentAction,
} from "./components/NewShipment";
import {
  ShipmentDetail,
  loader as shipmentDetailLoader,
  actions as shipmentDetailAction,
} from "./components/ShipmentDetail";
import DashboardPage from "./components/Dashboard";
import { ShipmentList, shipmentsLoader } from "./components/ShipmentsList";
import { loader as authLoader } from './components/util/authLoader';
import ErrorPage from "./components/Error";

/** Router configuration */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    loader: authLoader,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: loginActions,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/shipments",
        element: <DashboardPage />,
        children: [
          {
            index: true,
            element: <ShipmentList />,
            loader: shipmentsLoader,
          },
          {
            path: "create-shipment",
            element: <NewShipment />,
            loader: () => {
              return true;
            },
            action: newShipmentAction,
          },
          {
            path: ":shipmentId",
            element: <ShipmentDetail />,
            loader: shipmentDetailLoader,
            action: shipmentDetailAction,
          },
        ],
      }
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
