import { useRouteError } from 'react-router-dom';
import Header from '../Header';

import ErrorContent from '../ErrorContent';

function ErrorPage() {
  const error: any = useRouteError();

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
      <Header loggedIn={false}/>
      <ErrorContent title={title}>
        <p>{message}</p>
      </ErrorContent>
    </>
  );
}

export default ErrorPage;
