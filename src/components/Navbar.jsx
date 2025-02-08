// Navbar.jsx
import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { usePrivy } from '@privy-io/react-auth';
import { Link } from "react-router-dom";

export default function CustomNavbarNot() {
  const { ready, authenticated, login, logout } = usePrivy();
  const [activeTab, setActiveTab] = useState("Features");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Navbar>
      <NavbarBrand>
      <img src="/logo.png" alt="HEAL ME " className="h-7" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeTab === "Features"}>
        <Link color="foreground" onClick={() => (handleTabClick("Features"))}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "Customers"}>
        <Link aria-current="page" onClick={() => (handleTabClick("Customers"), login())}>
            Report Analysis
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "Integrations"}>
        <Link color="foreground" onClick={() => (handleTabClick("Integrations"), login())}>
            Image Diagonsis
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={login} color="primary" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
