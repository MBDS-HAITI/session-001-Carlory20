import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TextField,
  Box,
} from "@mui/material";

function CoursesPage({ notes }) {
  // Regrouper par matière
  const coursesMap = new Map();

  notes.forEach((note) => {
    if (!coursesMap.has(note.course)) {
      coursesMap.set(note.course, { course: note.course, count: 1 });
    } else {
      coursesMap.get(note.course).count += 1;
    }
  });

  const courses = Array.from(coursesMap.values());

  // --- Recherche ---
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((c) =>
    c.course.toLowerCase().includes(search.toLowerCase())
  );

  // --- Pagination ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCourses = filteredCourses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Matières
      </Typography>

      <TextField
        label="Rechercher une matière..."
        variant="outlined"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); // revenir à la page 1 après filtre
        }}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper} elevation={1}  sx={{
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matière</TableCell>
              <TableCell>Nombre de notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses.map((c) => (
              <TableRow key={c.course}>
                <TableCell>{c.course}</TableCell>
                <TableCell>{c.count}</TableCell>
              </TableRow>
            ))}

            {paginatedCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Aucune matière trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredCourses.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
      />
    </Box>
  );
}

export default CoursesPage;
