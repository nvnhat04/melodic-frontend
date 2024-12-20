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
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const DenseTable = ({
  header,
  rows = [],
  selectedTracks = [],
  onSelectRow,
  onSelectAllRows,
  modifiable = false,
  onModifyRow, 
  includeCheckbox = true, 
}) => {

  const columnWidth = `${100 / (header.length + (includeCheckbox ? 2 : 1))}%`; 

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
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
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
                    width: columnWidth,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row[headerCell.id]}
                </TableCell>
              ))}
              {modifiable && (
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onModifyRow(row)} 
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DenseTable;
