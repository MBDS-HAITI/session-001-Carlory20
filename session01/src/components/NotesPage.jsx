import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  TablePagination,
  Typography,
  Box,
  Chip,
} from "@mui/material";

function NotesPage({ notes }) {
  // 1️⃣ DÉDOUBLONNAGE : student.id + course + date
  const dedupedNotes = Array.from(
    new Map(
      notes.map((note) => [
        `${note.student.id}-${note.course}-${note.date}`,
        note,
      ])
    ).values()
  );

  // 2️⃣ ÉTATS UI
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("grade");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 3️⃣ FILTRAGE
  const filteredNotes = dedupedNotes.filter((note) => {
    const fullName = `${note.student.firstname} ${note.student.lastname}`.toLowerCase();
    const course = note.course.toLowerCase();
    const txt = search.toLowerCase();

    return (
      fullName.includes(txt) ||
      course.includes(txt) ||
      String(note.grade).includes(txt)
    );
  });

  // 4️⃣ TRI
  const sortedNotes = filteredNotes.slice().sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (orderBy === "grade") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  // 5️⃣ PAGINATION
  const paginatedNotes = sortedNotes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 🎨 fonction util pour colorer la note
  const getGradeColor = (grade) => {
    if (grade >= 90) return "success";
    if (grade >= 70) return "warning";
    return "error";
  };

  return (
    <Box>
      {/* Header + barre de recherche */}
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h5" component="h2">
            Notes
          </Typography>
         
        </Box>

        <TextField
          label="Rechercher (nom, cours, note...)"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 260 }}
        />
      </Box>

      <Paper
        elevation={2}
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(90deg, rgba(37,99,235,0.08), rgba(147,51,234,0.08))",
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Cours</TableCell>
                <TableCell>Étudiant</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : "asc"}
                    onClick={() => handleSortRequest("date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "grade"}
                    direction={orderBy === "grade" ? order : "asc"}
                    onClick={() => handleSortRequest("grade")}
                  >
                    Note
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedNotes.map((note) => (
                <TableRow
                  key={note.unique_id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                >
                  <TableCell>{note.unique_id}</TableCell>
                  <TableCell>{note.course}</TableCell>
                  <TableCell>
                    {note.student.firstname} {note.student.lastname}
                  </TableCell>
                  <TableCell>{note.date}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={note.grade}
                      color={getGradeColor(note.grade)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {paginatedNotes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucune note trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={sortedNotes.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page"
        />
      </Paper>
    </Box>
  );
}

export default NotesPage;
