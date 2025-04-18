// // src/components/PrivateRoute.jsx

// import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//   const isAuthenticated = localStorage.getItem("authenticated") === "true";

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;  // If not logged in, send to Login page
//   }

//   return children;  // If logged in, show the page
// }

// src/components/PrivateRoute.jsx

import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but also remember where the user was trying to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If authenticated, render the requested page
  return children;
}
