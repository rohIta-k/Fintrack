import { Routes, Route } from "react-router-dom";

import Dashboard from "../features/dashboard/Dashboard";
import Transactions from "../features/transactions/Transactions";
import Reports from "../features/reports/Reports";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default AppRoutes;