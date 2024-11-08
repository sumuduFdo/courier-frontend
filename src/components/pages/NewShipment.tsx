import { ActionFunction, useActionData } from "react-router-dom";
import ShipmentForm from "../ShipmentForm";
import { useEffect, useState } from "react";

export const NewShipmentPage = () => {
  const actionData: { error: boolean; message: string } | null =
    useActionData() as { error: boolean; message: string } | null;
  const [displayActionData, setDisplayActionData] = useState(false);
  useEffect(() => {
    if (actionData && actionData.message !== "") {
      setDisplayActionData(true);
    }
  }, [actionData]);

  return (
    <ShipmentForm
      displayMessage={displayActionData}
      setDisplayMessage={setDisplayActionData}
      messageData={actionData}
    />
  );
};

export const actions: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  let resData;

  let userId = "";
  let authToken = "";
  const authInfo = localStorage.getItem("shipmentAuth");
  if (authInfo) {
    const userAuthInfo = JSON.parse(authInfo);
    userId = userAuthInfo.userId;
    authToken = userAuthInfo.authToken;
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
  headers.append("authorization", `Bearer ${authToken}`);

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
