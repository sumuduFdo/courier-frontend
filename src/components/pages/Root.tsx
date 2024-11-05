import { Outlet } from 'react-router-dom';

import Header from '../Header';
import { useEffect, useState } from 'react';

function RootLayout() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
 
  useEffect(() => {
    updateLoggedIn();
  }, [])

  function updateLoggedIn () {
    const token = localStorage.getItem('authToken')
    if(token) {
      setUserLoggedIn(true);
    }
  }

  return (
    <>
      <Header loggedIn={userLoggedIn}/>
      <main className='main'>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
