// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import { Card } from "@mui/material";
import FlightRoute from "./components/FlightRoute";
import WeatherChart from "./data/Weather";

function Default() {
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox>
              <FlightRoute />
            </ArgonBox>
          </Card>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Card>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12} lg={7}>
                <WeatherChart />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Slider />
              </Grid>
            </Grid>
          </Card>
        </ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title="Flights by Country" rows={salesTableData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoriesList title="categories" categories={categoriesListData} />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
