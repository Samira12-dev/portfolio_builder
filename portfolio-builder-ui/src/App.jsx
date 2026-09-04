import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import Skills from "./pages/Skills/Skills";
import Experience from "./pages/Dashboard/Experience";
import Templates from "./pages/Dashboard/Templates";
import PortfolioPreview from "./pages/Dashboard/PortfolioPreview";
import PublicPortfolio from "./pages/PublicPortfolio/PublicPortfolio";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"  element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />

          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="templates" element={<Templates />} />
          <Route path="preview" element={<PortfolioPreview />} />

        </Route>
        <Route path="/portfolio/samira" element={<PublicPortfolio />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;