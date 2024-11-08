import { ActionFunction, useActionData, useLoaderData } from "react-router-dom";
import ShipmentForm from "../ShipmentForm";
import { useState, useEffect } from "react";

export const ShipmentDetail = () => {
  const loaderData = useLoaderData() as {
    error: boolean;
    message: string;
  } | null;
  const actionData = useActionData() as {
    error: boolean;
    message: string;
  } | null;
  
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    error: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (actionData && actionData.message !== "") {
      setAlertDisplay(true);
      setAlertMessage(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (loaderData && loaderData.error) {
      setAlertDisplay(true);
      setAlertMessage(loaderData);
    }
  }, [loaderData]);

  return (
    <>
      <ShipmentForm
        displayMessage={alertDisplay}
        setDisplayMessage={setAlertDisplay}
        messageData={alertMessage}
      />
    </>
  );
};

export const loader = async ({ params }) => {
  let shipmentData: { error: boolean; message?: string; data?: any };
  const shipmentId: string = params.shipmentId;

  let userId = "";
  let token = "";
  const authData = localStorage.getItem("shipmentAuth");
  if (authData) {
    userId = JSON.parse(authData).userId;
    token = JSON.parse(authData).authToken;
  }

  /** Construct headers */
  const headers: Headers = new Headers();
  headers.append("content-type", "appliation/json");
  headers.append("authorization", `Bearer ${token}`);
  headers.append("userId", userId);

  try {
    const res = await fetch("http://localhost:4500/shipments/" + shipmentId, {
      headers: headers,
    });
    if (!res.ok) {
      throw Error("Failed to fetch shipment details.");
    }
    const resData = await res.json();
    shipmentData = { error: false, data: resData.data };
  } catch (err: any) {
    console.error(err); 
    shipmentData = {
      error: true,
      message: err?.message ? err.message : "Failed to fetch shipment details.",
    };
  }

  return shipmentData;
};

export const actions: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newStatus = formData.get("shipmentStatus");
  const shipmentId = formData.get("shipmentId");
  let resData;

  let userId = "";
  let authToken = "";
  const authInfo = localStorage.getItem("shipmentAuth");
  if (authInfo) {
    const userAuthInfo = JSON.parse(authInfo);
    userId = userAuthInfo.userId;
    authToken = userAuthInfo.authToken;
  }

  const headers: Headers = new Headers();
  headers.append("content-type", "application/json");
  headers.append("authorization", `Bearer ${authToken}`);

  const reqBody = {
    userId: userId,
    shipmentId: shipmentId,
    updatedStatus: newStatus,
  };
  
  try { 
    const res = await fetch('http://localhost:4500/update-shipment', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(reqBody)
    });
    
    if(!res.ok) {
      throw new Error('Failed to update shipment status.')
    }

    resData = {error: false, message: 'Shipment status updated successfully.'}
  } catch(err: any) {
    resData = {error: true, message: 'Failed to update shipment status'};
  }

  return resData;
  
}; 
