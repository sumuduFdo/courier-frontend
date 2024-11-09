import { redirect, useNavigation, Form, useActionData } from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import forms from "./FormStyles.module.css";
import classes from "./Login.module.css";
import { setAuthToken } from "./util/authLoader";

export const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData: { error: boolean; status: number; message: string } | null =
    useActionData() as {
      error: boolean;
      status: number;
      message: string;
    } | null;

  return (
    <>
      {actionData && actionData.error && (
        <span className={`alert ${classes.erroralert} ${actionData.error === true ? 'alert-danger' : 'alert-success'}`}>
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
            <input type="password" name="password" id="password" autoComplete="false" required />
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

    setAuthToken(resData.data.userId, resData.data.token, resData.data.isAdmin, 1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return { error: true, status: 401, message: "User authentication failed. Please try again later" };
  }
  return redirect("/shipments");
};
