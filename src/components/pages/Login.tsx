import {
  redirect,
  useNavigation,
  Form,
  useActionData,
} from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import forms from "../shared/FormStyles.module.css";
import classes from "./Login.module.css";

export const LoginPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData: any = useActionData();
  if (actionData && actionData.error) {
    console.log("action data error: ", actionData);
  }

  return (
    <>
      {actionData && actionData.error && (
        <span className={`alert alert-secondary ${classes.erroralert}`}>
          {actionData.message}
        </span>
      )}
      <Form
        method="POST"
        className={forms.form}
        style={{ marginTop: "0", display: "block" }}
      >
        <div className={forms.formwrapper}>
          <h4 className={forms.formheading}>Login</h4>
          <div className={forms.formgroup}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" required />
          </div>
          <div className={forms.formgroup}>
            <label htmlFor="username">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className={forms.formgroup}>
            <button
              type="submit"
              className={forms.submitbtn}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export const loginActions: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const body = {
    userName: data.get("username"),
    password: data.get("password"),
  };

  try {
    const res = await fetch("http://localhost:4500/auth/login", {
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
    let message = "User authentication failed. Please try again later";
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
