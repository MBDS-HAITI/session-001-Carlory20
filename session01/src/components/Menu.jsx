import React from "react";

function Menu({ items, selectedItem, onSelect }) {
  const handleClick = (item) => {
    onSelect(item);      // menu dynamique : change le contenu
  };

  return (
    <nav className="menu">
      <ul className="menu-list">
        {items.map((item) => (
          <li key={item} className="menu-item">
            <button
              type="button"
              className={`menu-button ${
                selectedItem === item ? "menu-button-active" : ""
              }`}
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
