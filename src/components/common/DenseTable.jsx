import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DenseTable({ header, rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium">
        <TableHead>
          <TableRow>
            {header.map((headerCell, index) => (
              <TableCell
                key={headerCell.id}
                align={index === 0 ? "left" : "right"} 
              >
                {headerCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {header.map((headerCell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align={cellIndex === 0 ? "left" : "right"} 
                >
                  {row[headerCell.id]} {/* Match row keys with headerCell ids */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
