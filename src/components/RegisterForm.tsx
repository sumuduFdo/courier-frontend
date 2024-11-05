import { Form } from "react-router-dom";
import forms from "./shared/FormStyles.module.css";

function RegisterForm() {
  return (
    <Form className={forms.form} method="POST">
        <div className={forms.formwrapper}>
      <h4 className={forms.formheading}>Register</h4>

      <section>
        <div className={forms.formgroupsection}>
          <div className={forms.formgroup}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" required />
          </div>
          <div className={forms.formgroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" required />
          </div>
          <div className={forms.formgroup}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" id="dateOfBirth" required />
          </div>
        </div>
        <div className={forms.formgroupsection}>
          <div className={forms.formgroup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className={forms.formgroup}>
            <label htmlFor="phone">Mobile Number</label>
            <input type="tel" name="phone" id="phone" required />
          </div>
        </div>
        <div className={forms.formgroupsection}>
          <div className={forms.formgroup}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>

          <div className={forms.formgroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
            />
          </div>
        </div>
      </section>

      <section>
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
        <button
          type="submit"
          className={`${forms.submitbtn} ${forms.registerbtn}`}
        >
          Register
        </button>
      </div>
    </div>
    </Form>
    
  );
}

export default RegisterForm;

