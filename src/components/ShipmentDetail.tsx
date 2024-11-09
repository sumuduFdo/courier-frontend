/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import ShipmentForm from "./ShipmentForm";
import { useState, useEffect } from "react";
import { getFullToken, getToken } from "./util/authLoader";

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
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    }
  }, [loaderData]);

  const navigation = useNavigation();
  const [submitting, setSubmitting] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (isSubmitting === true) {
      setSubmitting(true);
    }
  }, [isSubmitting]);

  return (
    <>
      <ShipmentForm
        displayMessage={alertDisplay}
        setDisplayMessage={setAlertDisplay}
        messageData={alertMessage}
        formDisabled={submitting}
      />
    </>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  let shipmentData: { error: boolean; message?: string; data?: any };
  const shipmentId: string | undefined = params.shipmentId;

  const token = getToken();

  /** Construct headers */
  const headers: Headers = new Headers();
  headers.append("content-type", "appliation/json");
  headers.append("authorization", `Bearer ${token}`);

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
      message: "Failed to fetch shipment details.",
    };
  }

  return shipmentData;
};

export const actions: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newStatus = formData.get("shipmentStatus");
  const shipmentId = formData.get("shipmentId");
  let resData;

  let userId = '';
  const token = getToken();
  if(token) {
    userId = getFullToken().userId;
  }

  const headers: Headers = new Headers();
  headers.append("content-type", "application/json");
  headers.append("authorization", `Bearer ${token}`);

  const reqBody = {
    userId: userId,
    shipmentId: shipmentId,
    updatedStatus: newStatus,
  };

  try {
    const res = await fetch("http://localhost:4500/update-shipment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      throw new Error("Failed to update shipment status.");
    }

    resData = {
      error: false,
      message: "Shipment status updated successfully.",
    };
  } catch (err: any) {
    console.error(err);
    resData = { error: true, message: "Failed to update shipment status" };
  }

  return resData;
};
