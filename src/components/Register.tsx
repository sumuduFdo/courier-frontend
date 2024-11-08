import { Form } from "react-router-dom";
import forms from "./shared/FormStyles.module.css";

const Register = () => {

  function getCurrentDate() {
    const date = new Date;
    const year: number = date.getFullYear()
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    return `${year}-${month}-${day}`;
  }

  return (
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
            <input type="tel" name="phone" id="phone" required />
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
  );
};

export default Register;
