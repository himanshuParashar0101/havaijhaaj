import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const FlightRouteContext = createContext();

export const FlightRouteProvider = ({ children }) => {
  const [dep, setDep] = useState("");
  const [dis, setDis] = useState("");

  return (
    <FlightRouteContext.Provider value={{ dep, setDep, dis, setDis }}>
      {children}
    </FlightRouteContext.Provider>
  );
};

FlightRouteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlightRouteContext;
