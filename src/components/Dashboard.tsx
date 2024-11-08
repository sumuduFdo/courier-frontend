import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import classes from "./Dashboard.module.css";
import { Shipment } from "./shared/models/Shipment.model";

export const Dashboard = () => {
  const [shipmentData, setShipmentData] = useState<Shipment[]>([]);
  const [fetchError, setFetchError] = useState({ status: false, message: "" });
  const [adminStatus, setAdminStatus] = useState(false);
  const navigate = useNavigate();

  const loaderData = useLoaderData() as {error: boolean, data?: any, message?: string} | null;

  useEffect(() => {
    fetchShipmentHandler();
    updateAdminStatus();
    console.log('loader data: ', loaderData);
    console.log('data: ', loaderData?.data);
    if(loaderData?.error !== false) {
      setFetchError({status: true, message: loaderData?.message ? loaderData.message : ''})
    } else {
      setShipmentData(loaderData?.data);
    }
  }, [loaderData]);

  const updateAdminStatus = () => {
    const authData = localStorage.getItem("shipmentAuth");
    console.log('authData: ', authData);
    if (authData) {
      setAdminStatus(JSON.parse(authData).isAdmin);
    }
  };

  // const getAuthToken = () => {
  //   let userId = "";
  //   let authToken = "";
  //   const authInfo = localStorage.getItem("shipmentAuth");
  //   if (authInfo) {
  //     const userAuthInfo = JSON.parse(authInfo);
  //     userId = userAuthInfo.userId;
  //     authToken = userAuthInfo.authToken;
  //   }

  //   return { userId: userId, token: authToken };
  // };

  // const fetchShipmentHandler = async () => {
  //   console.log("fetching data");

  //   const { userId, token } = getAuthToken();

  //   const headers: Headers = new Headers();
  //   headers.append("content-type", "appliation/json");
  //   headers.append("authorization", `Bearer ${token}`);
  //   headers.append("userId", userId);

  //   fetch("http://localhost:4500/shipments", { headers: headers })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data.error !== null) {
  //         throw new Error(data.error.message);
  //       } else {
  //         setShipmentData(data.data);
  //         setDataLength(data.data.length);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setFetchError({
  //         status: true,
  //         message: "Failed to fetch data. Please try again",
  //       });
  //     });
  // };

  return (
    <>
      {/* {displayAddForm && (
        <AddShipment cancelForm={hideForm} addShipment={appendNewShipment} />
      )} */}
      {shipmentData.length > 0 && (
        <div className={classes.outerwrapper} style={{ marginTop: "2rem" }}>
          <div className={classes.row}>
            <h4>Shipments</h4>
            <button
              className="btn-custom"
              onClick={() => {
                navigate("create-shipment");
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
                  (shipment: {
                    id: string;
                    recipientName: string;
                    recipientAddress: string;
                    weight: number;
                    shipmentType: string;
                    deliveryType: string;
                    trackingNumber: string;
                    shipmentStatus: string;
                  }, id) => {
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
                              onClick={() => { navigate(`/shipments/${shipment.id}`)}}
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
      { fetchError.status === false && (
        <>
          <div className={classes.row}>
            <button
              className={`btn-custom ${classes.btnabsolute}`}
              onClick={() => {
                navigate("/create-shipment");
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

export const fetchShipmentHandler = async () => {

  const getAuthToken = () => {
    let userId = "";
    let authToken = "";
    const authInfo = localStorage.getItem("shipmentAuth");
    if (authInfo) {
      const userAuthInfo = JSON.parse(authInfo);
      userId = userAuthInfo.userId;
      authToken = userAuthInfo.authToken;
    }

    return { userId: userId, token: authToken };
  };

  console.log("fetching data");

  const { userId, token } = getAuthToken();
  let returnData: any = null;

  const headers: Headers = new Headers();
  headers.append("content-type", "appliation/json");
  headers.append("authorization", `Bearer ${token}`);
  headers.append("userId", userId);

  try {
    const res = await fetch("http://localhost:4500/shipments", { headers: headers });
    if(!res.ok) {
      throw new Error("Failed to fetch data from server.");
    }
    const data = await res.json();
    returnData = {error: false, data: data.data};
  } catch (err: any) {
    console.error(err); 
    returnData = {error: true, message: err.message ? err.message : 'Failed to fetch data.'};
  }

  // fetch("http://localhost:4500/shipments", { headers: headers })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     if (data.error !== null) {
  //       throw new Error(data.error.message);
  //     } else {
  //       returnData = {data: data.data, error: null};
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     returnData = {error: true, data: null}
  //   });

    return returnData;
};

