import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken,setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Function to check if the user is authenticated by hitting the /profile endpoint
  const checkAuth = () => {
    fetch('http://localhost:5252/profile', {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${accessToken}`, // Include the access token in the header
      },
      credentials: 'include', // Include cookies in the request

    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      })
      .catch(() => {
        setIsAuthenticated(false); // Handle error
      });
  };

  // Login function
  const login = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  // When the app loads, check if the user is authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    fetch('http://localhost:5252/logout', {
      method: 'POST',
      credentials: 'include', // Ensure cookies are cleared on the server side
    })
      .then(() => {
        setIsAuthenticated(false); // Set to false on successful logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
