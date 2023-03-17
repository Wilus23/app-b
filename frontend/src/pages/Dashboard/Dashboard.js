import React from "react";
import LogoutButton from "../../components/ui/LogoutButton";
import AccountBalance from "../../components/ui/Balance";
const Dashboard = () => {
  return (
    <div>
      <h1>Witam po zalogowaniu</h1>
      <AccountBalance />
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
