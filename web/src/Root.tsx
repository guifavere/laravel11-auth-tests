import { Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { AuthProvider } from "./hooks/useAuth";

export const Root = () => {
  return (
    <AuthProvider>
      <header className="container mx-auto border border-gray-600 p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/login">login</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/register">register</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="container mx-auto border-l border-r border-b border-gray-600 p-4">{<Outlet />}</main>
    </AuthProvider>
  );
};
