import { Outlet } from "react-router-dom";

export const Dashboard = () => {

  return (
    <>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
