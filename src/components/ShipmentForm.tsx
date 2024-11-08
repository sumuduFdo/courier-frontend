import forms from "./shared/FormStyles.module.css";
import classes from "./ShipmentForm.module.css";
import { Shipment } from "./shared/models/Shipment.model";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { useEffect, useState } from "react";

const ShipmentForm = (props: {
  displayMessage: boolean,
  setDisplayMessage: (state: boolean) => void,
  messageData: { error: boolean; message: string } | null;
}) => {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [shipmentStatus, setShipmentStatus] = useState("");

  const loaderData: {
    error: boolean;
    data?: Shipment;
    message?: string;
  } | null = useLoaderData() as {
    error: boolean;
    data?: Shipment;
    message?: string;
  } | null;

  useEffect(() => {
    console.log("loader data received inside: ", shipment);
    if (loaderData?.data) {
      setShipment(loaderData.data);
      setShipmentStatus(loaderData.data.shipmentStatus);
    }
  }, [loaderData, shipment]);

  const navigate = useNavigate();
  useEffect(() => {
    if (props.displayMessage === true) {
      console.log("props display message set to true");
      let timer = 3000;
      if(props.messageData?.error === true) {
        timer = 5000;
      }
      setTimeout(() => {
        props.setDisplayMessage(false);
        if(!props.messageData?.error === true) {
          navigate("/shipments");
        } 
      }, timer); 
    }
  }, [props, navigate]);

  return (
    <>
      {props.displayMessage && props.messageData && (
        <div
          className={`${classes.alertwrapper}`}
          style={{ width: "fit-contents" }}
        >
          <p
            className={`${classes.alertcontent} alert  ${
              props.messageData.error === true
                ? "alert-danger"
                : "alert-success"
            }`}
          >
            {props.messageData.message}
          </p>
        </div>
      )}

      <Form method="POST" className={classes.shipmentform}>
        <div className={`${forms.formwrapper} ${forms.detailwrapper}`}>
          <h4 className={forms.formheading}>
            {shipment === null ? "Create Shipment" : "Update Shipment Status"}
          </h4>
          {shipment === null ? (
            <div className={forms.formgroupsection}>
              <div
                className={forms.formgroup}
                style={{ alignContent: "flex-start" }}
              >
                <div className={forms.formgroup}>
                  <label htmlFor="recipientName">Recipient Name</label>

                  <input
                    type="text"
                    name="recipientName"
                    id="recipientName"
                    required
                  />
                </div>
                <section>
                  <h6 className={forms.sectiontitle}>Recipient Adddress</h6>
                  <div className={forms.formgroupsection}>
                    <div style={{ width: "25%" }} className={forms.formgroup}>
                      <label htmlFor="houseNumber">House No.</label>

                      <input
                        type="houseNumber"
                        name="houseNumber"
                        id="houseNumber"
                        required
                      />
                    </div>
                    <div className={forms.formgroup} style={{ width: "80%" }}>
                      <label htmlFor="streetAddress">Street Address</label>
                      <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        required
                      />
                    </div>
                  </div>
                  <div className={forms.formgroupsection}>
                    <div className={forms.formgroup}>
                      <label htmlFor="city">City</label>
                      <input type="text" name="city" id="city" required />
                    </div>

                    <div className={forms.formgroup}>
                      <label htmlFor="zipcode">Zipcode</label>
                      <input type="text" name="zipcode" id="zipcode" required />
                    </div>
                  </div>
                </section>
              </div>
              <div className={forms.formgroup}>
                <div className={forms.formgroup}>
                  <label htmlFor="weight" style={{ lineHeight: "1.2" }}>
                    Parcel Weight
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    min={0.1}
                    required
                  />
                </div>
                <div
                  className={forms.formgroup}
                  style={{ marginBottom: "1rem" }}
                >
                  <label htmlFor="shipmentType">Parcel Type</label>

                  <select
                    name="shipmentType"
                    id="shipmentType"
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select Parcel Type
                    </option>
                    <option value="Document">Document</option>
                    <option value="Small Parcel">Small Parcel</option>
                    <option value="Large Parcel">Large Parcel</option>
                    <option value="Fragile Items">Fragile Items</option>
                    <option value="Perishable Items">Perishable Items</option>
                  </select>
                </div>
                <div
                  className={forms.formgroup}
                  style={{ marginBottom: "2rem" }}
                >
                  <label htmlFor="deliveryType">Delivery Type</label>

                  <select
                    name="deliveryType"
                    id="deliveryType"
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select Delivery Type
                    </option>
                    <option value="Standard Delivery">Standard Delivery</option>
                    <option value="Express Delivery">Express Delivery</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <table className={classes.detailstable}>
              <tbody>
              <tr>
                <td style={{ width: "30%" }}>Recipient Name</td>
                <td className={classes.contenttd}>{shipment.recipientName}</td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>Recipient Address</td>
                <td className={classes.contenttd}>
                  {shipment.recipientAddress}
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>Parcel Weight</td>
                <td className={classes.contenttd}>{shipment.weight} Kg</td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>Parcel Type</td>
                <td className={classes.contenttd}>{shipment.shipmentType}</td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>Delivery Type</td>
                <td className={classes.contenttd}>{shipment.deliveryType}</td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>Tracking Number</td>
                <td className={classes.contenttd}>{shipment.trackingNumber}</td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>Current Status</td>
                <td className={classes.contenttd}>
                  <input type='text' name='shipmentId' value={shipment.id} onChange={() => {}} hidden />
                  <select
                    name="shipmentStatus"
                    id="shipmentStatus"
                    className="form-select"
                    value={shipmentStatus}
                    onChange={({ target }) => {
                      setShipmentStatus(target.value);
                    }}
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Order Created">Order Created</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out For Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Attempted Delivery">
                      Attempted Delivery
                    </option>
                    <option value="Delivery Rescheduled">
                      Delivery Rescheduled
                    </option>
                    <option value="Returned To Sender">Returned to Sender</option>
                    <option value="Exception">Exception / Delayed</option>
                  </select>
                </td>
              </tr>
              </tbody>
            </table>
          )}

          <div className={forms.formgroupsection}>
            <div className={forms.formgroup}>
              <button type="submit" className={`btn-custom`}>
                {shipment === null ? "Create Shipment" : "Update Status"}
              </button>
            </div>
            <div className={forms.formgroup}>
              <button
                className={`btn-custom`}
                onClick={() => {
                  navigate("/shipments");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ShipmentForm;
