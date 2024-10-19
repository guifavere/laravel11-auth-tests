import { Outlet, redirect } from "react-router-dom";
import { getUser } from "./lib/api";

export const loader = async () => {
  try {
    const { data } = await getUser();

    return { user: data };
  } catch (error) {
    if (error?.response?.status === 401 || error?.response?.status === 419) {
      return redirect('login');
    }

    throw error;
  }
}

export const ProtectedRoutes = () => <Outlet />;
