import { NavLink, useNavigate, } from "react-router-dom"; import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiAward,
  FiFileText,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";

import "../../App.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };
  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FiHome />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <FiUser />,
    },
    {
      path: "/dashboard/projects",
      label: "Projects",
      icon: <FiBriefcase />,
    },
    {
      path: "/dashboard/skills",
      label: "Skills",
      icon: <FiAward />,
    },
    {
      path: "/dashboard/experience",
      label: "Experience",
      icon: <FiFileText />,
    },
    {
      path: "/dashboard/templates",
      label: "Templates",
      icon: <FiLayers />,
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <span className="logo-icon">P</span>
        <span>PortfolioAI</span>
      </div>

      <nav className="sidebar-nav">

        <p className="sidebar-label">
          MENU
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

      </nav>

      <div className="sidebar-bottom">

        <button className="sidebar-logout" onClick={handleLogout}  >
          <FiLogOut />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;