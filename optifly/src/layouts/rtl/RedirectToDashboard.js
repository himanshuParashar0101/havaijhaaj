import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToDashboard = () => {
  window.location.href = "https://aircraftsustainabilityplatform.netlify.app/dashboard";
  return null;
};

export default RedirectToDashboard;
