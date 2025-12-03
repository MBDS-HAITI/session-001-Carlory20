import React, { useState } from "react";
import "./App.css";
import mbdsLogo from "./assets/mbds.jpg";   // ton logo
import Menu from "./components/Menu";
import Content from "./components/Content";
import notesData from "./data/data.json";

const MENU_ITEMS = ["Notes", "Etudiants", "Matières", "A propos"];

function Header() {
  return (
    <header className="header">
      <img src={mbdsLogo} alt="logo mbds" className="logo" />
      <div>
        <h1>Introduction à React</h1>
        <h2>À la découverte des premières notions de React</h2>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      © {year} - Carlory.Eliantus, Tous droits réservés.
    </footer>
  );
}

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Notes");

  return (
    <div className="app-container">
      <div className="page">
        <Menu
          items={MENU_ITEMS}
          selectedItem={selectedMenu}
          onSelect={setSelectedMenu}
        />

        <Header />

        <Content selectedMenu={selectedMenu} notes={notesData} />

        <Footer />
      </div>
    </div>
  );
}

export default App;
