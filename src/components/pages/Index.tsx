import { Outlet } from 'react-router-dom';

import Header from '../Header';
import { useState } from 'react';

const Index = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return (
    <>
      <Header isloggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn}/>
      <main className='main'>
        <Outlet context={{isLoggedIn, setIsLoggedIn}}/>
      </main>
    </>
  );
}

export default Index;
