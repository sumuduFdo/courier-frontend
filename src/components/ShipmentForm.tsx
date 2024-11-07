import forms from "./shared/FormStyles.module.css";
import classes from "./ShipmentForm.module.css";

function ShipmentForm(props: { cancelForm: any, addShipment: any }) {
  async function submitForm(event: any) {
    console.log('cancelForm: ', typeof(props.cancelForm));
    console.log('formsubmt: ', typeof(event));
    event.preventDefault();
    const formElement = event.target.elements;
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

    const formData = {
      userId: userId,
      recipientName: formElement.recipientName.value,
      recipientAddress: `${formElement.houseNumber.value}, ${formElement.streetAddress.value}, ${formElement.city.value} ${formElement.zipcode.value}`,
      weight: formElement.weight.value,
      shipmentType: formElement.shipmentType.value,
      deliveryType: formElement.deliveryType.value,
    };

    const headers: Headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append("authorization", `Bearer ${authToken}`);

    const res = await fetch("http://localhost:4500/create-shipment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      return props.cancelForm();
    }

    const resData = await res.json();
    console.log(resData)
    // props.addShipment(resData);
    props.cancelForm();
  }

  return (
    // <div className={classes.backdrop} onClick={props.cancelForm}>
    <div className={classes.backdrop}>
      <form
        method="POST"
        onSubmit={submitForm}
        className={classes.shipmentform}
      >
        <div className={`${forms.formwrapper}`}>
          <h4 className={forms.formheading}>Create Shipment</h4>
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
              <div style={{ width: "20%" }} className={forms.formgroup}>
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
          <div className={forms.formgroup}>
            <label htmlFor="weight">Parcel Weight (Kg)</label>
            <input type="number" name="weight" id="weight" min={0.1} required />
          </div>
          <div className={forms.formgroup} style={{ marginBottom: "1rem" }}>
            <label htmlFor="shipmentType">Parcel Type</label>
            <select
              name="shipmentType"
              id="shipmentType"
              className="form-select"
              required
            >
              <option value="" disabled selected>
                Select Parcel Type
              </option>
              <option value="Document">Document</option>
              <option value="Small Parcel">Small Parcel</option>
              <option value="Large Parcel">Large Parcel</option>
              <option value="Fragile Items">Fragile Items</option>
              <option value="Perishable Items">Perishable Items</option>
            </select>
          </div>
          <div className={forms.formgroup} style={{ marginBottom: "2rem" }}>
            <label htmlFor="deliveryType">Delivery Type</label>
            <select
              name="deliveryType"
              id="deliveryType"
              className="form-select"
              required
            >
              <option value="" disabled selected>
                Select Delivery Type
              </option>
              <option value="Standard Delivery">Standard Delivery</option>
              <option value="Express Delivery">Express Delivery</option>
            </select>
          </div>
          <div className={forms.formgroupsection}>
            <div className={forms.formgroup}>
              <button type="submit" className={`btn-custom`}>
                Create Shipment
              </button>
            </div>
            <div className={forms.formgroup}>
              <button className={`btn-custom`} onClick={props.cancelForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShipmentForm;
