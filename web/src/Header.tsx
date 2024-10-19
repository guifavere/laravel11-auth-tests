import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useAuth } from "./hooks/useAuth";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const onLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="container flex items-center justify-between mx-auto border border-gray-600 p-4">
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
      {isAuthenticated && <Button onClick={onLogout}>logout</Button>}
    </header>
  )
}