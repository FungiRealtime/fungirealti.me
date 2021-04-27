import { Outlet } from "react-router-dom";

export default function Docs() {
  return (
    <>
      <h1>Welcome to the Docs</h1>

      <Outlet />
    </>
  );
}
