// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"; // Correct import ✅

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PeriodTracker from "./pages/PeriodTracker";
import SymptomChecker from "./pages/SymptomChecker";
import GenerateReport from "./pages/GenerateReport";
import DietTips from "./pages/DietTips";
import UploadPrescription from "./pages/UploadPrescription";

export default function App() {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        {/* 👇 If logged in, go to /home, else show Login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
        
        {/* 👇 Login Page Route (MUST be present since PrivateRoute redirects to /login) */}
        <Route path="/login" element={<Login />} />
        
        {/* 👇 Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (Wrap inside <PrivateRoute>) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute>
              <PeriodTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/symptoms"
          element={
            <PrivateRoute>
              <SymptomChecker />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <GenerateReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/diet"
          element={
            <PrivateRoute>
              <DietTips />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPrescription />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}
