import React from "react";
import FlightMap from "./components/FlightMap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import { Card } from "@mui/material";
import Footer from "examples/Footer";
import ArgonTypography from "components/ArgonTypography";

const Billing = () => {
  const sourceIcao = "VAAH"; // Example source ICAO
  const destinationIcao = "VAAU"; // Example destination ICAO
  const apiKey = "HHATcc52xUMzxqvX46Cwyf1mKfJ91nclEzOUtzfc";
  const apiUrl = "https://api.flightplandatabase.com/search/plans";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h4">Flight Route Map</ArgonTypography>
          </ArgonBox>
          <ArgonBox>
            <FlightMap
              sourceIcao={sourceIcao}
              destinationIcao={destinationIcao}
              apiKey={apiKey}
              apiUrl={apiUrl}
            />
          </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Billing;
