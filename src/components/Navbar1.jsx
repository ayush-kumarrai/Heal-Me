// Navbar.jsx
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { usePrivy } from '@privy-io/react-auth';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CustomNavbar() {
  const { ready, authenticated, login, logout } = usePrivy(); 

  const [activeTab, setActiveTab] = useState("Features");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Navbar>
      <NavbarBrand>
      <Link to="/">
    <img src="/logo.png" alt="Logo" className="h-7" />
  </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeTab === "Features"}>
          <Link color="foreground" to="/" onClick={() => handleTabClick("Features")}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "Customers"}>
          <Link to="/medicalReportAnalyser" aria-current="page" onClick={() => handleTabClick("Customers")}>
           Report Analysis
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "Integrations"}>
          <Link color="foreground" to="/imageDiagnosis" onClick={() => handleTabClick("Integrations")}>
            Image Diagnosis
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "Appointment"}>
          <Link color="foreground" to="/showlungs" onClick={() => handleTabClick("Appointment")}>
            Lungs Cancer Predictor
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={logout} color="primary"  variant="flat">
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
