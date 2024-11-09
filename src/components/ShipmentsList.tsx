import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import classes from "./Dashboard.module.css";
import { Shipment } from "./util/Shipment.model";
import { getFullToken, getToken } from "./util/authLoader";

export const ShipmentList = () => {
  const [shipmentData, setShipmentData] = useState<Shipment[]>([]);
  const [fetchError, setFetchError] = useState({ status: false, message: "" });
  const [adminStatus, setAdminStatus] = useState(false);
  const navigate = useNavigate();

  const loaderData = useLoaderData() as {
    error: boolean;
    data?: Shipment[];
    message?: string;
  } | null;

  useEffect(() => {
    updateAdminStatus();
    if (loaderData?.error !== false) {
      setFetchError({
        status: true,
        message: loaderData?.message ? loaderData.message : "",
      });
    } else {
      setShipmentData(loaderData.data  || []);
    }
  }, [loaderData]);

  const updateAdminStatus = () => {
    let isAdmin = false;
    const token = getToken();
    if(token) {
      isAdmin = getFullToken().isAdmin;
    }
    setAdminStatus(isAdmin);
  };

  return (
    <>
      {shipmentData.length > 0 && (
        <div className={classes.outerwrapper} style={{ marginTop: "2rem" }}>
          <div className={classes.row}>
            <h4>Shipments</h4>
            <button
              className="btn-custom"
              onClick={() => {
                navigate("/shipments/create-shipment");
              }}
            >
              Add Shipment
            </button>
          </div>

          <div className={classes.row}>
            <table className={classes.shipmenttable}>
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>Recipient Name</th>
                  <th style={{ width: "15%" }}>Recipient Address</th>
                  <th style={{ width: "5%" }}>Weight (kg)</th>
                  <th style={{ width: "6%" }}>Parcel Type</th>
                  <th style={{ width: "6%" }}>Delivery Type</th>
                  <th style={{ width: "8%" }}>Tracking Number</th>
                  <th style={{ width: "5%" }}>Current Status</th>
                  {adminStatus && <th style={{ width: "10%" }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {shipmentData.map(
                  (
                    shipment: {
                      id: string;
                      recipientName: string;
                      recipientAddress: string;
                      weight: number;
                      shipmentType: string;
                      deliveryType: string;
                      trackingNumber: string;
                      shipmentStatus: string;
                    },
                    id
                  ) => {
                    return (
                      <tr key={id}>
                        <td>{shipment.recipientName}</td>
                        <td>{shipment.recipientAddress}</td>
                        <td>{shipment.weight}</td>
                        <td>{shipment.shipmentType}</td>
                        <td>{shipment.deliveryType}</td>
                        <td>{shipment.trackingNumber}</td>
                        <td>{shipment.shipmentStatus}</td>
                        {adminStatus && (
                          <td className={classes.updateStatusTd}>
                            <button
                              className={`${classes.btnUpdate} btn-custom`}
                              onClick={() => {
                                navigate(`/shipments/${shipment.id}`);
                              }}
                            >
                              Update
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {fetchError.status === false &&
        (shipmentData.length === 0 && (
          <>
            <div className={classes.row}>
              <button
                className={`btn-custom ${classes.btnabsolute}`}
                onClick={() => {
                  navigate("/shipments/create-shipment");
                }}
              >
                Add Shipment
              </button>
            </div>
            <div className={classes.message}>
              <h2>No shipments found.</h2>
            </div>
          </>
        ))}
      {fetchError.status && (
        <div className={classes.message}>
          <h2>Something went wrong</h2>
          <p>{fetchError.message}</p>
        </div>
      )}
    </>
  );
};

export const shipmentsLoader = async () => {

  const token = getToken();
  const headers: Headers = new Headers();
  headers.append("content-type", "appliation/json");
  headers.append("authorization", `Bearer ${token}`);

  try {
    const res = await fetch("http://localhost:4500/shipments", {
      headers: headers,
    });

    const resData = await res.json();
    if (!res.ok) {
      return {error: true, status: resData.error.status, message: resData.error.message}
    }

    return { error: false, data: resData.data };
  } catch (err) {
    // Catch errors from fetch or JSON parsing
    console.error(err);
    return {
      error: true,
      message: "Failed to fetch data. Please try again.",
    };
  }
};
