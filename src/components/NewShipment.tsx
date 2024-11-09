import { ActionFunction, useActionData, useNavigation } from "react-router-dom";
import ShipmentForm from "./ShipmentForm";
import { useEffect, useState } from "react";
import { getFullToken, getToken } from "./util/authLoader";

export const NewShipment = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  useEffect(() => {
    if(isSubmitting === true) {
      setSubmitting(true);
    }
  }, [isSubmitting]);

  const actionData: { error: boolean; message: string } | null =
    useActionData() as { error: boolean; message: string } | null;
  const [displayActionData, setDisplayActionData] = useState(false);
  useEffect(() => {
    if (actionData && actionData.message !== "") {
      setDisplayActionData(true);
    }
    if(actionData?.error === true) {
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    } 
  }, [actionData]);

  return (
    <ShipmentForm
      displayMessage={displayActionData}
      setDisplayMessage={setDisplayActionData}
      messageData={actionData}
      formDisabled={submitting}
    />
  );
};

export const actions: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  let resData;

  const token = getToken();
  let userId = '';
  if(token) {
    userId = getFullToken().userId;
  }

  const formData = {
    userId: userId,
    recipientName: data.get("recipientName"),
    recipientAddress: `${data.get("houseNumber")}, ${data.get(
      "streetAddress"
    )}, ${data.get("city")} ${data.get("zipcode")}`,
    weight: data.get("weight"),
    shipmentType: data.get("shipmentType"),
    deliveryType: data.get("deliveryType"),
  };

  const headers: Headers = new Headers();
  headers.append("content-type", "application/json");
  headers.append("authorization", `Bearer ${token}`);

  try {
    const res = await fetch("http://localhost:4500/create-shipment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('Error! Failed to create new shipment');
    }
    resData = {error: false, message: 'New shipment added successfully.'};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    resData = {
      error: true,
      message: err?.message
        ? err.message
        : "Error! Failed to create new shipment",
    };
  }

  return resData;
};
