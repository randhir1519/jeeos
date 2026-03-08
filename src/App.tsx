import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "@/pages/LandingPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import AIPlanner from "@/pages/AIPlanner";
import Practice from "@/pages/Practice";
import Analytics from "@/pages/Analytics";
import Challenges from "@/pages/Challenges";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import DiagnosticTest from "@/pages/DiagnosticTest";
import MentorshipBooking from "@/pages/MentorshipBooking";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/diagnostic" element={<DiagnosticTest />} />
          <Route path="/book-mentorship" element={<MentorshipBooking />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="planner" element={<AIPlanner />} />
            <Route path="practice" element={<Practice />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="challenges" element={<Challenges />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
