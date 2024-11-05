import RegisterForm from "../RegisterForm";
import { ActionFunction, json, redirect } from "react-router-dom";

export function RegisterPage() {
  return <RegisterForm />;
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
  console.log('requst body: ', body);

  const res = await fetch("http://localhost:4500/auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.log('Error: user registration failed');
    const resData = await res.json();
    const status = resData.error.status ? resData.error.status : 500;
    const message = resData.error.message ? resData.error.message : "User registration failed";
    throw json({ message:  message}, { status: status });
  }

  const resData = await res.json();
  localStorage.setItem("userId", resData.data.userId);
  localStorage.setItem("authToken", resData.data.token);

  return redirect("/dashboard");
};
