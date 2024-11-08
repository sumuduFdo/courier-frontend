import { Outlet, useNavigate } from "react-router-dom";

import Header from "../Header";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("shipmentAuth");
    if (auth) {
      const tokenData = JSON.parse(auth).authToken;
      if (tokenData) {
        navigate("/shipments");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

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
