import StudentsPage from "./StudentsPage";
import CoursesPage from "./CoursesPage";
import NotesPage from "./NotesPage";
import AboutPage from "./AboutPage";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

function Menu()
{
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/courses" element={<CoursesPage />} />   
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
        </>
    );
}