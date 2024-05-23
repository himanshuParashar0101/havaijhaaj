import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import React, { useState } from "react";

function FlightRoute() {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
  });

  const [dep, setDep] = useState("");
  const [dis, setDis] = useState("");
  const [arr, setArr] = useState([]);

  const apiKey = "I08guMHeESwY4pAQEJ0YyPEdk4e6WydeYBcsH7Ly";
  const apiUrl = "https://api.flightplandatabase.com/search/plans";

  const handleSubmit = () => {
    setArr([dep, dis]);
  };

  const handleClear = () => {
    setFormData({
      departure: "",
      destination: "",
    });
    setDep("");
    setDis("");
    setArr([]);
  };

  return (
    <ArgonBox p={3}>
      <ArgonTypography variant="h4" mb={2}>
        Route Generator
      </ArgonTypography>
      <ArgonTypography variant="body2" mb={3}>
        Enter departure and destination ICAO codes to compute a new flight plan. This route
        generator attempts to find an optimal route through global airways and intersections. When
        crossing the Atlantic or the Pacific, the current oceanic tracks can optionally also be
        considered. Generation can take up to 2 minutes, so please be patient.
      </ArgonTypography>
      <ArgonBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={3}
        border="1px solid #aaa"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          width="100%"
          flexDirection={{ xs: "column", md: "row" }}
        >
          <ArgonBox
            width={{ xs: "100%", md: "45%" }}
            p={2}
            mb={{ xs: 2, md: 0 }}
            border="1px solid #ddd"
            borderRadius="8px"
            bgcolor="#f8f9fa"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <ArgonTypography variant="h6" color="text">
              Departure
            </ArgonTypography>
            <ArgonInput
              type="text"
              id="departure"
              name="departure"
              placeholder="ICAO"
              value={dep}
              onChange={(e) => setDep(e.target.value)}
              fullWidth
            />
          </ArgonBox>
          <ArgonTypography variant="h3" mt={{ xs: 0, md: 1 }} mx={{ xs: 0, md: 2 }} mb={{ xs: 2, md: 0 }}>
            &#x21C4;
          </ArgonTypography>
          <ArgonBox
            width={{ xs: "100%", md: "45%" }}
            p={2}
            border="1px solid #ddd"
            borderRadius="8px"
            bgcolor="#f8f9fa"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <ArgonTypography variant="h6" color="text">
              Destination
            </ArgonTypography>
            <ArgonInput
              type="text"
              id="destination"
              name="destination"
              placeholder="ICAO"
              value={dis}
              onChange={(e) => setDis(e.target.value)}
              fullWidth
            />
          </ArgonBox>
        </ArgonBox>
        <ArgonBox display="flex" justifyContent="center" mt={3} width="100%" flexDirection={{ xs: "column", md: "row" }}>
          <ArgonButton onClick={handleClear} color="secondary" sx={{ marginRight: { xs: 0, md: 2 }, marginBottom: { xs: 2, md: 0 } }}>
            Clear
          </ArgonButton>
          <ArgonButton onClick={handleSubmit} color="primary">
            Go
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </ArgonBox>
  );
}

export default FlightRoute;
