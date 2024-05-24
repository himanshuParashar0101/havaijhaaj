/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useContext } from "react";
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


// Data
import WeatherMap from "./data/WeatherMap";
import FlightRouteContext from "FlightRouteContext";
import Table from "examples/Tables/Table";
import projectsTableData from "./data/projectsTableData";
import authorsTableData from "./data/authorsTableData";
import Slider from "layouts/dashboard/components/Slider";
import WeatherChart from "./data/weatherchart2";
import { Grid } from "@mui/material";


function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const { dep, dis } = useContext(FlightRouteContext);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h4">Weather optimal route</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <WeatherMap sourceIata={dep} destinationIata={dis}/>
            </ArgonBox>
          </Card>
        </ArgonBox>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Weather Data Chart</ArgonTypography>
          </ArgonBox>
          <ArgonBox mb={3}>
          <Card>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12} lg={7}>
              <iframe src="https://weatherchartreturns.netlify.app/" title="description" height={350} width={653} >
              </iframe>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Slider/>
              </Grid>
            </Grid>
          </Card>
        </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
