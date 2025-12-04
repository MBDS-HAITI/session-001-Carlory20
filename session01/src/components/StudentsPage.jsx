// src/components/StudentsPage.jsx
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

function StudentsPage({ students }) {
  // --- Recherche ---
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstname} ${s.lastname}`.toLowerCase();
    const txt = search.toLowerCase();
    return fullName.includes(txt) || String(s.id).includes(txt);
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

  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Étudiants
      </Typography>

      <TextField
        label="Rechercher (nom, prénom, id...)"
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
              <TableCell>ID Étudiant</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Nom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.firstname}</TableCell>
                <TableCell>{s.lastname}</TableCell>
              </TableRow>
            ))}

            {paginatedStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Aucun étudiant trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredStudents.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
      />
    </Box>
  );
}

export default StudentsPage;
