import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./ResultsTable.css";

function ResultsTable({ questions, results }) {
  return (
    <>
      <TableContainer component={Paper} className="results-table">
        <Table aria-label="results table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Réponse</TableCell>
              <TableCell align="right">Catégorie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {questions[index].text}
                </TableCell>
                <TableCell align="right">{result}</TableCell>
                <TableCell align="right">{questions[index].category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        className="login-button"
        variant="contained"
        size="large"
        color="primary"
        startIcon={<LogoutIcon />}
        sx={{
          mt: "1rem",
          backgroundColor: "#DB4437",
          "&:hover": { backgroundColor: "#CC3C2E" },
        }} // Changer la couleur du bouton et de son hover
      >
        Log Out
      </Button>
    </>
  );
}

export default ResultsTable;
