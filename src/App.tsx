import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import InfluencerLayout from "./layouts/InfluencerLayout";
import ConsumerLayout from "./layouts/ConsumerLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/auth/HomePage";
import InfluencerDashboard from "./pages/influencer/InfluencerDashboard";
import ConsumerMarketplace from "./pages/consumer/ConsumerMarketplace";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        
        {/* Influencer Routes */}
        <Route path="influencer" element={<InfluencerLayout />}>
          <Route index element={<InfluencerDashboard />} />
          <Route path="campaigns" element={<div>Campaigns</div>} />
          <Route path="chat" element={<div>Influencer Chat</div>} />
        </Route>

        {/* Consumer Routes */}
        <Route path="consumer" element={<ConsumerLayout />}>
          <Route index element={<ConsumerMarketplace />} />
          <Route path="wallet" element={<div>My Wallet</div>} />
          <Route path="chat" element={<div>Consumer Chat</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div>User Management</div>} />
          <Route path="settings" element={<div>System Settings</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
