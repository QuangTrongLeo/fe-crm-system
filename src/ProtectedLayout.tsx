import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";

export default function ProtectedLayout() {
  const accessToken = localStorage.getItem("accessToken");

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
