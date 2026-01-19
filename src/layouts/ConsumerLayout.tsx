import { Outlet } from "react-router-dom";

export default function ConsumerLayout() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Outlet />
    </div>
  );
}
