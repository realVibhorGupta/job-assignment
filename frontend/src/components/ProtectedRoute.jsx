import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Add token to request header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Remove /api from the URL since it's already in baseURL
      const response = await axios.get("/protected"); // Changed from /api/protected

      setIsAuthenticated(true);

      if (response.data.user) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
