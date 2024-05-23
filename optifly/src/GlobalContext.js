// GlobalContext.js
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [globalValue, setGlobalValue] = useState([]);

  const addValue = (value1, value2) => {
    setGlobalValue([value1, value2]);
  };

  return (
    <GlobalContext.Provider value={{ globalValue, addValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContext, GlobalProvider };