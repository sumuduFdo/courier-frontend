import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

import Header from "./Header";
import { useEffect, useState } from "react";
import { getToken, getTokenDuration } from "./util/authLoader";
import { logoutHandler } from "./util/lougoutHandler";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      navigate("/shipments");
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  const token = useLoaderData();
  useEffect(() => {
    if (!token) {
      return;
    }
    const remainingDuration = getTokenDuration();
    setIsLoggedIn(true);
    setTimeout(() => {
      logoutHandler(setIsLoggedIn, navigate);
    }, remainingDuration);
  }, [token]);

  return (
    <>
      <Header isloggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />
      <main className="main">
        <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
      </main>
    </>
  );
};

export default Index;
