// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import mbdsLogo from "./assets/mbds.jpg";
import Menu from "./components/Menu";
import Content from "./components/Content";

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
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // 1) GRADES
        const gradesResponse = await fetch(`${API_BASE_URL}/grades`);
        if (!gradesResponse.ok) {
          throw new Error(`Erreur HTTP grades ${gradesResponse.status}`);
        }
        const apiGrades = await gradesResponse.json();

        const mappedNotes = apiGrades.map((g, index) => ({
          unique_id: g._id || index,
          course: g.course?.name || g.course?.code || "N/A",
          student: {
            firstname: g.student?.firstName || "",
            lastname: g.student?.lastName || "",
            id: g.student?.id || "", // l'id logique de l'étudiant
          },
          date: g.date ? g.date.substring(0, 10) : "",
          grade: g.grade,
        }));
        setNotes(mappedNotes);

        // 2) STUDENTS
        const studentsResponse = await fetch(`${API_BASE_URL}/students`);
        if (!studentsResponse.ok) {
          throw new Error(`Erreur HTTP students ${studentsResponse.status}`);
        }
        const apiStudents = await studentsResponse.json();

        const mappedStudents = apiStudents.map((s, index) => ({
          // si s.id n'existe pas pour certains (cas anciens), fallback sur index
          id: s.id ?? index,
          firstname: s.firstName || "",
          lastname: s.lastName || "",
        }));
        setStudents(mappedStudents);

        // 3) COURSES
        const coursesResponse = await fetch(`${API_BASE_URL}/courses`);
        if (!coursesResponse.ok) {
          throw new Error(`Erreur HTTP courses ${coursesResponse.status}`);
        }
        const apiCourses = await coursesResponse.json();

        const mappedCourses = apiCourses.map((c, index) => ({
          id: c._id || index,
          code: c.code || "",
          name: c.name || "",
        }));
        setCourses(mappedCourses);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError(err.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
          students={students}
          courses={courses}
          loading={loading}
          error={error}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
