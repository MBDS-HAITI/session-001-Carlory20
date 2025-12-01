import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mbdsLogo from './assets/mbds.jpg'

function Header() {
  return (
          <>
          <img src={mbdsLogo} alt="logo mbds" />
          <h1>Introduction à React</h1>
          <h2>A la découverte des premières notions de React</h2>
          </>
          
  )
}

function MainContent() {
  const now = new Date();

  const jours = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];

  const mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const jourNom = jours[now.getDay()];
  const moisNom = mois[now.getMonth()];
  const annee = now.getFullYear();

  const heure = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const seconde = String(now.getSeconds()).padStart(2, "0");

  return (
    <main>
      <p>
        Bonjour, on est le {jourNom}, {moisNom}, {annee} et il est {heure}:
        {minute}:{seconde}
      </p>
    </main>
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
 
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  )
}

export default App
