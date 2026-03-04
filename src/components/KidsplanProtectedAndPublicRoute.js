import React from 'react';
import { Navigate } from 'react-router-dom';

// NOTE: Updated ProtectedRedirect to handle landing page routing
export const ProtectedClientRedirect = () => {
    return (
      <Navigate to="/kidsplan-client" replace />
    );
  };