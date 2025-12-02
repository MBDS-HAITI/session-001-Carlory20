import React, { useState } from "react";
import "./App.css";
import mbdsLogo from "./assets/mbds.jpg";
import Menu from "./components/Menu";
import notes from "./data/data.json";          
import { getRandomItem } from "./utils/randomNote"; 
import NoteDetails from "./components/NoteDetails";  

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

function MainContent() {
  const [selectedNote, setSelectedNote] = useState(getRandomItem(notes));

  const handleRandomClick = () => {
    const randomNote = getRandomItem(notes);
    setSelectedNote(randomNote);
  };

  return (
    <main>
      <button onClick={handleRandomClick}>
        Afficher une note aléatoire
      </button>

      <NoteDetails note={selectedNote} />
    </main>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      © {year} - Carlory Eliantus, Tous droits réservés.
    </footer>
  );
}

function App() {
  return (
    <div className="app-container">
      <Menu />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
