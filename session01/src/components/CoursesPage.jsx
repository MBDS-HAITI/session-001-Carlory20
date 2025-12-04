// src/components/CoursesPage.jsx
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

function CoursesPage({ courses }) {
  // --- Recherche ---
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((c) => {
    const txt = search.toLowerCase();
    return (
      (c.name || "").toLowerCase().includes(txt) ||
      (c.code || "").toLowerCase().includes(txt)
    );
  });

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
        label="Rechercher (nom, code...)"
        variant="outlined"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        sx={{ mb: 2 }}
      />

      <TableContainer
        component={Paper}
        elevation={1}
        sx={{
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Matière</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.code}</TableCell>
                <TableCell>{c.name}</TableCell>
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
