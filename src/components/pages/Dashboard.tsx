import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import React from "react";

export const DashboardPage = () => {
  const { setIsLoggedIn } = useOutletContext() as {setIsLoggedIn: any};
  const navigate = useNavigate();


  React.useEffect(() => {
    validateUserLogin();
  }, []);

  const getAuthToken = () => {
    let userId = "";
    let authToken = "";
    const authInfo = localStorage.getItem("shipmentAuth");
    if (authInfo) {
      const userAuthInfo = JSON.parse(authInfo);
      userId = userAuthInfo.userId;
      authToken = userAuthInfo.authToken;
    }

    return { userId: userId, token: authToken };
  };
  const validateUserLogin = () => {
    const { token } = getAuthToken();
    if (token !== "") {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardPage;
