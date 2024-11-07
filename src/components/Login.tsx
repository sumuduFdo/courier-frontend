import forms from "./shared/FormStyles.module.css";
import { Form, useOutletContext } from "react-router-dom";

const Login = (props: {onLogin: Function}) => {

  const setIsLoggedIn = useOutletContext();

  return (
    <>
      <Form method="POST" className={forms.form} style={{'marginTop': '10vh'}}>
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
            <button type="submit" className={forms.submitbtn}>
              Submit
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
