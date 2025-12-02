// src/components/Menu.jsx
import React from "react";

const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

function Menu() {
  const handleClick = (label) => {
    alert(label);
  };

  return (
    <nav className="menu">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item} className="menu-item">
            <button
              type="button"
              className="menu-button"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
