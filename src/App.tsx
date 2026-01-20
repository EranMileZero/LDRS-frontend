import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { RequireAuth } from "@/components/auth/RequireAuth";
import RootLayout from "./layouts/RootLayout";
import InfluencerLayout from "./layouts/InfluencerLayout";
import ConsumerLayout from "./layouts/ConsumerLayout";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterSelection from "./pages/auth/RegisterSelection";
import InfluencerRegister from "./pages/auth/InfluencerRegister";
import ConsumerRegister from "./pages/auth/ConsumerRegister";
import InfluencerDashboard from "./pages/influencer/InfluencerDashboard";
import ConsumerMarketplace from "./pages/consumer/ConsumerMarketplace";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Campaigns from "./pages/influencer/Campaigns";
import Chat from "./pages/influencer/Chat";
import Users from "./pages/admin/Users";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<ConsumerMarketplace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register">
            <Route index element={<RegisterSelection />} />
            <Route path="influencer" element={<InfluencerRegister />} />
            <Route path="consumer" element={<ConsumerRegister />} />
          </Route>
          
          {/* Influencer Routes */}
          <Route path="influencer" element={
            <RequireAuth allowedRoles={['influencer', 'admin']}>
              <InfluencerLayout />
            </RequireAuth>
          }>
            <Route index element={<InfluencerDashboard />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          {/* Consumer Routes */}
          <Route path="consumer" element={
            <RequireAuth allowedRoles={['consumer', 'admin']}>
              <ConsumerLayout />
            </RequireAuth>
          }>
            <Route index element={<ConsumerMarketplace />} />
            <Route path="wallet" element={<div>My Wallet</div>} />
            <Route path="chat" element={<div>Consumer Chat</div>} />
          </Route>

          {/* Admin Routes */}
          <Route path="admin" element={
            <RequireAuth allowedRoles={['admin']}>
              <AdminLayout />
            </RequireAuth>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<div>System Settings</div>} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
