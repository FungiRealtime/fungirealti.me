import { Outlet } from "react-router";

export function DashboardOutlet() {
  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
