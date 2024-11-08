import {
  ActionFunction,
  redirect,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";
import forms from "../shared/FormStyles.module.css";
import classes from "./Login.module.css";

export function RegisterPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData: any = useActionData();
  if (actionData && actionData.error) {
    console.log("action data error: ", actionData);
  }

  function getCurrentDate() {
    const date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {actionData && actionData.error && (
        <span className={`alert alert-secondary ${classes.erroralert}`}>
          {actionData.message}
        </span>
      )}
      <Form className={forms.form} method="POST">
        <div className={forms.formwrapper}>
          <h4 className={forms.formheading}>Register</h4>

          <div className={forms.formgroupsection}>
            <div className={forms.formgroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                pattern="^[a-zA-Z._ ]*$"
                maxLength={30}
                id="firstName"
                required
              />
            </div>
            <div className={forms.formgroup}>
              <label htmlFor="lastName">Last Name</label>

              <input
                type="text"
                name="lastName"
                id="lastName"
                pattern="^[a-zA-Z._ ]*$"
                maxLength={30}
                required
              />
            </div>
          </div>
          <div className={forms.formgroupsection}>
            <div className={forms.formgroup}>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                min="1900-01-01"
                max={`${getCurrentDate()}`}
                id="dateOfBirth"
                required
              />
            </div>

            <div className={forms.formgroup}>
              <label htmlFor="phone">Mobile Number</label>
              <div style={{ display: "flex" }}>
                <div
                  className="input-group-prepend"
                  style={{ height: "fit-content" }}
                >
                  <div
                    className="input-group-text"
                    style={{
                      lineHeight: "1.15",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                  >
                    +94
                  </div>
                </div>
                <input
                  style={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  type="tel"
                  name="phone"
                  pattern="^\d+$"
                  id="phone"
                  maxLength={9}
                  minLength={9}
                  required
                />
              </div>
            </div>
          </div>

          <div className={forms.formgroupsection}>
            <div className={forms.formgroup}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className={forms.formgroup}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
            </div>
          </div>
          <div className={forms.formgroupsection}>
            <div style={{ width: "20%" }} className={forms.formgroup}>
              <label htmlFor="houseNumber">House No.</label>
              <input
                type="houseNumber"
                name="houseNumber"
                id="houseNumber"
                pattern="^[0-9A-Z/ ]*$"
                maxLength={10}
                required
              />
            </div>
            <div className={forms.formgroup} style={{ width: "80%" }}>
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                pattern="^[a-zA-Z0-9,. ]*$"
                maxLength={400}
                required
              />
            </div>
          </div>
          <div className={forms.formgroupsection}>
            <div className={forms.formgroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                pattern="^[A-Za-zÀ-ÿ\u00C0-\u00FF\s'-]+$"
                maxLength={100}
                required
              />
            </div>

            <div className={forms.formgroup}>
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                pattern="^[0-9\s\-]{3,10}$"
                maxLength={20}
                required
              />
            </div>
          </div>

          <div className={forms.formgroup} style={{ marginTop: "1.5rem" }}>
            <button
              type="submit"
              className={`${forms.submitbtn} ${forms.registerbtn}`}
            >
              Register
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}

export const actions: ActionFunction = async ({ request }) => {
  console.log("executing actions");
  const data = await request.formData();

  const body = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    dateOfBirth: data.get("dateOfBirth"),
    email: data.get("email"),
    phone: data.get("phone"),
    password: data.get("password"),
    houseNumber: data.get("houseNumber"),
    streetAddress: data.get("streetAddress"),
    city: data.get("city"),
    zipcode: data.get("zipcode"),
  };
  console.log("requst body: ", body);
  try {
    const res = await fetch("http://localhost:4500/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        error: true,
        status: resData.error.status,
        message: resData.error.message,
      };
    }

    localStorage.setItem(
      "shipmentAuth",
      JSON.stringify({
        userId: resData.data.userId,
        authToken: resData.data.token,
        isAdmin: resData.data.isAdmin,
      })
    );
  } catch (err: any) {
    console.error(err);
    let message = "User registration failed. Please try again later";
    let status = 401;
    if (err.status) {
      status = err.status;
    }
    if (err.message) {
      message = err.message;
    }
    return { error: true, status: status, message: message };
  }
  return redirect("/shipments");
};
