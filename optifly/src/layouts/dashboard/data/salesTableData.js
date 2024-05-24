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

// Countries flags
import US from "assets/images/icons/flags/US.png";
import DE from "assets/images/icons/flags/DE.png";
import GB from "assets/images/icons/flags/GB.png";
import BR from "assets/images/icons/flags/BR.png";

const navigationTableData = [
  {
    country: [US, "united states"],
    flights: 2500,
    avgDelay: "30 mins",
    riskAssessment: "29.9%",
    weatherImpact: "15.0%"
  },
  {
    country: [DE, "germany"],
    flights: "3,900",
    avgDelay: "40 mins",
    riskAssessment: "40.22%",
    weatherImpact: "20.5%"
  },
  {
    country: [GB, "great britain"],
    flights: "1,400",
    avgDelay: "25 mins",
    riskAssessment: "23.44%",
    weatherImpact: "10.2%"
  },
  { 
    country: [BR, "brazil"],
    flights: 562, 
    avgDelay: "35 mins", 
    riskAssessment: "32.14%",
    weatherImpact: "18.0%"
  },
];

export default navigationTableData;
