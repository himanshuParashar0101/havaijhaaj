// Argon Dashboard 2 MUI components
import ArgonTypography from "components/ArgonTypography";

const categoriesListData = [
  {
    color: "dark",
    icon: <i className="ni ni-world" style={{ fontSize: "12px" }} />,
    name: "Flight Paths",
    description: (
      <>
        10 optimal,{" "}
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          5 alternative suggested
        </ArgonTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <i className="ni ni-sound-wave" style={{ fontSize: "12px" }} />,
    name: "Weather Reports",
    description: (
      <>
        20 analyzed,{" "}
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          3 critical
        </ArgonTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <i className="ni ni-laptop" style={{ fontSize: "12px" }} />,
    name: "System Health Logs",
    description: (
      <>
        2 issues active,{" "}
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          15 resolved
        </ArgonTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <i className="ni ni-satisfied" style={{ fontSize: "12px" }} />,
    name: "Successful Flights",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          +&nbsp;750
        </ArgonTypography>
      </>
    ),
    route: "/",
  },
];

export default categoriesListData;
