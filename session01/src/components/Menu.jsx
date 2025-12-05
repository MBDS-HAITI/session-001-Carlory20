import React from "react";
import { NavLink } from "react-router-dom";

const MENU_ITEMS = [
  { label: "Accueil", path: "/" },
  { label: "Notes", path: "/notes" },
  { label: "Étudiants", path: "/students" },
  { label: "Matières", path: "/courses" },
  { label: "À propos", path: "/about" },
];

function Menu() {
  return (
    <nav className="menu">
      <ul className="menu-list">
        {MENU_ITEMS.map((item) => (
          <li key={item.path} className="menu-item">
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                "menu-button " + (isActive ? "menu-button-active" : "")
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
