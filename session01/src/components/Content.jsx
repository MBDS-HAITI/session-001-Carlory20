// src/components/Content.jsx
import React from "react";
import NotesPage from "./NotesPage";
import StudentsPage from "./StudentsPage";
import CoursesPage from "./CoursesPage";
import AboutPage from "./AboutPage";

function Content({ selectedMenu, notes }) {
  return (
    <main className="content" key={selectedMenu}>
      {selectedMenu === "Notes" && <NotesPage notes={notes} />}
      {selectedMenu === "Etudiants" && <StudentsPage notes={notes} />}
      {selectedMenu === "Matières" && <CoursesPage notes={notes} />}
      {selectedMenu === "A propos" && <AboutPage />}
    </main>
  );
}

export default Content;
