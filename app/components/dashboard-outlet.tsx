import { Outlet } from "react-router-dom";

export function DashboardOutlet() {
  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
}
