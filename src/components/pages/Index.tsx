import { Outlet } from 'react-router-dom';

import Header from '../Header';
import { useState } from 'react';

const Index = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    setIsLoggedIn(true);
  }
 
  const onLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  }

  return (
    <>
      <Header isloggedIn={isLoggedIn} onLogout={onLogout}/>
      <main className='main'>
        <Outlet context={setIsLoggedIn}/>
      </main>
    </>
  );
}

export default Index;
