import React, { useState } from "react";
import classes from "./Dashboard.module.css";
import AddShipment from "./AddShipment";

import { useOutletContext, useNavigate} from "react-router-dom";

interface Shipment {
  id: string;
  recipientName: string;
  recipientAddress: string;
  weight: number;
  shipmentType: string;
  deliveryType: string;
  trackingNumber: string;
  shipmentStatus: string;
}

const Dashboard = () => {
  const [shipmentData, setShipmentData] = useState<Shipment[]>([]);
  const [fetchError, setFetchError] = useState({ status: false, message: "" });
  const [dataLength, setDataLength] = useState(0);
  const [displayAddForm, setDisplayAddForm] = useState(false);

  const setIsLoggedIn: any = useOutletContext()
  const navigate = useNavigate()

  React.useEffect(() => {
    validateUserLogin();
    fetchShipmentHandler();
  }, []);

  const getAuthToken = () => {
    let authToken = "";
    const token = localStorage.getItem("authToken");
    if (token) {
      authToken = token;
    }

    return authToken;
  };

  const validateUserLogin = () => {
    const token = getAuthToken();
    if (token !== "") {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }
  };

  const fetchShipmentHandler = async () => {
    console.log("fetching data");

    let authToken = "";
    const token = localStorage.getItem("authToken");
    if (token) {
      authToken = token;
    }
    let userId = "";
    const currentUserId = localStorage.getItem("userId");
    if (currentUserId) {
      userId = currentUserId;
    }

    const headers: Headers = new Headers();
    headers.append("content-type", "appliation/json");
    headers.append("authorization", `Bearer ${authToken}`);
    headers.append("userId", userId);

    fetch("http://localhost:4500/shipments", { headers: headers })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error !== null) {
          throw new Error(data.error.message);
        } else {
          setShipmentData(data.data);
          setDataLength(data.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
        setFetchError({
          status: true,
          message: "Failed to fetch data. Please try again",
        });
      });
  };

  function hideForm() {
    setDisplayAddForm(false);
  }

  function appendNewShipment(shipment: Shipment) {
    const data = shipmentData.slice();
    data.push(shipment);
    setShipmentData(data);
  }

  return (
    <>
      {displayAddForm && (
        <AddShipment cancelForm={hideForm} addShipment={appendNewShipment} />
      )}
      {dataLength > 0 && (
        <div className={classes.outerwrapper} style={{ marginTop: "2rem" }}>
          <div className={classes.row}>
            <h4>Shipments</h4>
            <button
              className="btn-custom"
              onClick={() => {
                setDisplayAddForm(true);
              }}
            >
              Add Shipment
            </button>
          </div>

          <div className={classes.row}>
            <table className={classes.shipmenttable}>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Recipient Name</th>
                  <th style={{ width: "20%" }}>Recipient Address</th>
                  <th style={{ width: "8%" }}>Parcel Weight (kg)</th>
                  <th style={{ width: "10%" }}>Parcel Type</th>
                  <th style={{ width: "10%" }}>Delivery Type</th>
                  <th style={{ width: "15%" }}>Tracking Number</th>
                  <th style={{ width: "5%" }}>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {shipmentData.map(
                  (shipment: {
                    id: string;
                    recipientName: string;
                    recipientAddress: string;
                    weight: number;
                    shipmentType: string;
                    deliveryType: string;
                    trackingNumber: string;
                    shipmentStatus: string;
                  }) => {
                    return (
                      <tr>
                        <td>{shipment.recipientName}</td>
                        <td>{shipment.recipientAddress}</td>
                        <td>{shipment.weight}</td>
                        <td>{shipment.shipmentType}</td>
                        <td>{shipment.deliveryType}</td>
                        <td>{shipment.trackingNumber}</td>
                        <td>{shipment.shipmentStatus}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {dataLength === 0 && fetchError.status === false && (
        <>
          <div className={classes.row}>
            <button
              className={`btn-custom ${classes.btnabsolute}`}
              onClick={() => {
                setDisplayAddForm(true);
              }}
            >
              Add Shipment
            </button>
          </div>
          <div className={classes.message}>
            <h2>No shipments found.</h2>
          </div>
        </>
      )}

      {fetchError.status && (
        <div className={classes.message}>
          <h2>Something went wrong</h2>
          <p>{fetchError.message}</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
