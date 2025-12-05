import React, { useState, useEffect } from "react";
import "./App.css";
import mbdsLogo from "./assets/mbds.jpg";
import Menu from "./components/Menu";
import NotesPage from "./components/NotesPage";
import StudentsPage from "./components/StudentsPage";
import CoursesPage from "./components/CoursesPage";
import AboutPage from "./components/AboutPage";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

const API_BASE_URL = "http://localhost:8010/api";

function Header() {
  return (
    <header className="header">
      <img src={mbdsLogo} alt="logo mbds" className="logo" />
      <div>
        <h1>Introduction à React</h1>
        <h2>Application de gestion des notes (Node, MongoDB, React)</h2>
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

        // GRADES
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
            id: g.student?.id || "",
          },
          date: g.date ? g.date.substring(0, 10) : "",
          grade: g.grade,
        }));
        setNotes(mappedNotes);

        // STUDENTS
        const studentsResponse = await fetch(`${API_BASE_URL}/students`);
        if (!studentsResponse.ok) {
          throw new Error(`Erreur HTTP students ${studentsResponse.status}`);
        }
        const apiStudents = await studentsResponse.json();

        const mappedStudents = apiStudents.map((s, index) => ({
          id: s.id ?? index,
          firstname: s.firstName || "",
          lastname: s.lastName || "",
        }));
        setStudents(mappedStudents);

        // COURSES
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
        <Menu />

        <div className="main-content">
          <Header />

          <main className="content">
            {loading && <p>Chargement des données...</p>}
            {error && !loading && (
              <p style={{ color: "red" }}>Erreur : {error}</p>
            )}

            {!loading && !error && (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<NotesPage notes={notes} />} />
                <Route
                  path="/students"
                  element={<StudentsPage students={students} />}
                />
                <Route
                  path="/courses"
                  element={<CoursesPage courses={courses} />}
                />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
