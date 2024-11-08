import Dashboard from "../Dashboard";

export const ShipmentsListPage = () => {
  return <Dashboard />;
};

export const shipmentsLoader = async () => {
  let userId = "";
  let token = "";
  const authToken = localStorage.getItem("shipmentAuth");
  if (authToken) {
    const tokenData = JSON.parse(authToken);
    userId = tokenData.userId;
    token = tokenData.token;
  }

  const headers: Headers = new Headers();
  headers.append("content-type", "appliation/json");
  headers.append("authorization", `Bearer ${token}`);
  headers.append("userId", userId);

  try {
    const res = await fetch("http://localhost:4500/shipments", { headers: headers });
    
    // Check if the response is ok (status code 200-299)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    // Check if error response
    if (data.error !== null) {
      throw new Error(data.error.message);
    }

    return { error: false, shipments: data.data };
  } catch (err) {
    // Catch errors from fetch or JSON parsing
    console.error(err); 
    return {
      error: true,
      message: "Failed to fetch data. Please try again.",
    };
  }

  fetch("http://localhost:4500/shipments", { headers: headers })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error !== null) {
        throw new Error(data.error.message);
      } else {
        return { error: false, shipments: data.data };
      }
    })
    .catch((err) => {
      return {
        error: true,
        message: "Failed to fetch data. Please try again.",
      };
    });
};
