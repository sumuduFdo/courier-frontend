import { useInRouterContext, useRouteError } from "react-router-dom";
import Header from "./Header";

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  
  const {isLoggedIn, setIsLoggedIn} = useInRouterContext();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <Header isloggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />
      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <h1>{title}</h1>
        {message}
      </div>
    </>
  );
};

export default ErrorPage;
