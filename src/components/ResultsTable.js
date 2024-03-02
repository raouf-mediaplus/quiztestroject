import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./ResultsTable.css";

function ResultsTable({ questions, results }) {
  return (
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
  );
}

export default ResultsTable;
