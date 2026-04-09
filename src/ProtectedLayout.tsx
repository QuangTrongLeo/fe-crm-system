import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";
import { getCookie } from "./lib/cookies";

export default function ProtectedLayout() {
  const accessToken = getCookie("access_token");

  if (!accessToken) {
    console.log("User not found or access token not found")
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
