// import React, { useState } from "react";
// import "./App.css";
// import mbdsLogo from "./assets/mbds.jpg";   // ton logo
// import Menu from "./components/Menu";
// import Content from "./components/Content";
// import notesData from "./data/data.json";

// const MENU_ITEMS = ["Notes", "Etudiants", "Matières", "A propos"];

// function Header() {
//   return (
//     <header className="header">
//       <img src={mbdsLogo} alt="logo mbds" className="logo" />
//       <div>
//         <h1>Introduction à React</h1>
//         <h2>À la découverte des premières notions de React</h2>
//       </div>
//     </header>
//   );
// }

// function Footer() {
//   const year = new Date().getFullYear();
//   return (
//     <footer className="footer">
//       © {year} - Carlory Eliantus, Tous droits réservés.
//     </footer>
//   );
// }

// function App() {
//   const [selectedMenu, setSelectedMenu] = useState("Notes");

//   return (
//     <div className="app-container">
//       <div className="page">
//         <Menu
//           items={MENU_ITEMS}
//           selectedItem={selectedMenu}
//           onSelect={setSelectedMenu}
//         />

//         <Header />

//         <Content selectedMenu={selectedMenu} notes={notesData} />

//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;
// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import mbdsLogo from "./assets/mbds.jpg";
import Menu from "./components/Menu";
import Content from "./components/Content";

// ⚠️ on n'utilise plus data.json
// import notesData from "./data/data.json";

const MENU_ITEMS = ["Notes", "Etudiants", "Matières", "A propos"];
const API_BASE_URL = "http://localhost:8010/api";

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

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Charger les données depuis ton backend Node/Mongo
  useEffect(() => {
    async function fetchGrades() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/grades`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const apiGrades = await response.json();

        // 🧠 Mapper le format Mongo → format "notes" déjà utilisé par tes composants
        const mappedNotes = apiGrades.map((g, index) => ({
          unique_id: g._id || index, // identifiant affiché dans la table
          course: g.course?.name || g.course?.code || "N/A",
          student: {
            firstname: g.student?.firstName || "",
            lastname: g.student?.lastName || "",
            id: g.student?._id || "",
          },
          date: g.date ? g.date.substring(0, 10) : "",
          grade: g.grade,
        }));

        setNotes(mappedNotes);
      } catch (err) {
        console.error("Erreur lors du chargement des notes :", err);
        setError(err.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchGrades();
  }, []);

  return (
    <div className="app-container">
      <div className="page">
        <Menu
          items={MENU_ITEMS}
          selectedItem={selectedMenu}
          onSelect={setSelectedMenu}
        />

        <Header />

        <Content
          selectedMenu={selectedMenu}
          notes={notes}
          loading={loading}
          error={error}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
