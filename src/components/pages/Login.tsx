import { json, redirect, useOutletContext } from "react-router-dom";
import { ActionFunction } from "react-router-dom";

import Login from "../Login";

export const LoginPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const setIsLoggedIn: Function = useOutletContext();

  return <Login onLogin={setIsLoggedIn}/>;
};

export const loginActions: ActionFunction = async ({ request }) => {
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
  localStorage.setItem('shipmentAuth', JSON.stringify({
    userId: resData.data.userId,
    authToken: resData.data.token,
    isAdmin: resData.data.isAdmin
  }))

  return redirect("/shipments");
};
