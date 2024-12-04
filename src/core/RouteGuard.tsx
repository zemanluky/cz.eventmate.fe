import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthState from "../hooks/useAuthState"; // Use your custom useAuthState hook
import { Spinner } from "@ParkComponents/spinner";

interface RouteGuardProps {
    children: React.ReactNode; // Explicitly allow children
  redirectPath?: string; // Optional redirect path
}

const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    redirectPath = "/auth", // Optional redirect path
}) => {
    
  const { user, loading } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <Spinner/>; // Render a loader while checking auth state
  }


  // If no user, redirect to /auth page
  if (!user) {
    return (
      <Navigate
        to={redirectPath}
        state={{ from: location }} // Preserve the current location
        replace
      />
    );
  }

  return <>{children}</>; // Render children if the user is authenticated
};

export default RouteGuard;