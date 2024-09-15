import { Outlet } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Header } from "./Header";

export const Root = () => {
  return (
    <AuthProvider>
      <Header />
      <main className="container mx-auto border-l border-r border-b border-gray-600 p-4">{<Outlet />}</main>
    </AuthProvider>
  );
};
