import { json, redirect, useOutletContext } from "react-router-dom";
import { ActionFunction } from "react-router-dom";
import LoginForm from "../LoginForm";

export function LoginPage() {

  return <LoginForm />;
}

export const actions: ActionFunction = async ({ request, params }) => {

  console.log("executing actions");
  const data = await request.formData();

  const body = {
    userName: data.get("username"),
    password: data.get("password"),
  };

  const res = await fetch("http://localhost:4500/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw json({ message: "User authentication failure." }, { status: 500 });
  }
  
  const resData = await res.json();
  localStorage.setItem("userId", resData.data.userId);
  localStorage.setItem("authToken", resData.data.token);
  

  return redirect("/dashboard");
};
