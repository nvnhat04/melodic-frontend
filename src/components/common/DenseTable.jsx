import React from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DenseTable = ({
  header,
  rows = [],
  selectedTracks = [],
  onSelectRow,
  onSelectAllRows,
  includeCheckbox = true,  // New prop to conditionally include checkbox column
}) => {
  // Dynamically calculate column width based on whether there's a checkbox column
  const columnWidth = `${100 / (header.length + (includeCheckbox ? 1 : 0))}%`; // Add 1 for checkbox if included

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium">
        <TableHead>
          <TableRow>
            {/* Conditionally render the header checkbox column */}
            {includeCheckbox && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedTracks.length > 0 &&
                    selectedTracks.length < rows.length
                  }
                  checked={selectedTracks.length === rows.length}
                  onChange={onSelectAllRows}
                />
              </TableCell>
            )}
            {header.map((headerCell) => (
              <TableCell
                key={headerCell.id}
                align="left"
                sx={{
                  width: columnWidth,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {headerCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* Conditionally render the row checkbox */}
              {includeCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedTracks.includes(rowIndex)}
                    onChange={() => onSelectRow(rowIndex)}
                  />
                </TableCell>
              )}
              {header.map((headerCell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align="left"
                  sx={{
                    width: columnWidth, // Dynamically set width
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row[headerCell.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DenseTable;
