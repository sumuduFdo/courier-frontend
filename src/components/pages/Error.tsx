import { useRouteError, useOutletContext } from 'react-router-dom';
import Header from '../Header';

import ErrorInfo from '../ErrorInfo';

const ErrorPage = () => {
  const error: any = useRouteError();
  // const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  // const onLogout = () => {
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('authToken');
  //   setIsLoggedIn(false);
  // }

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      {/* <Header isloggedIn={isLoggedIn} onLogout={onLogout}/> */}
      <ErrorInfo title={title}>
        <p>{message}</p>
      </ErrorInfo>
    </>
  );
}

export default ErrorPage;

