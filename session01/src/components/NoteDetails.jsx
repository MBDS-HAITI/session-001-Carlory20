import React from "react";
import "./NoteDetails.css"; 

function NoteDetails({ note }) {
  if (!note) {
    return <p>Aucune note à afficher.</p>;
  }

  const { course, student, date, grade, unique_id } = note;
  const fullName = `${student.firstname} ${student.lastname}`;

  return (
    <div className="note-card">
      <h2 className="note-title">Détail de la note #{unique_id}</h2>
      <p><strong>Cours :</strong> {course}</p>
      <p><strong>Étudiant :</strong> {fullName} (ID : {student.id})</p>
      <p><strong>Date :</strong> {date}</p>
      <p><strong>Note :</strong> {grade} / 100</p>
    </div>
  );
}

export default NoteDetails;
