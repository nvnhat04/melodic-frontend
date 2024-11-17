import React, { useEffect, useState , useMemo} from "react";

import Container from "../common/Container.jsx";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Button,
  Stack,
  Typography,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import uiConfigs from "../../configs/ui.configs.js";

const columns =[

]

function Management({delete: handleDelete ,getAllData: getAllData, items = [], columns =[]}) {
    const [data, setData] = useState(items || []);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] =useState(false);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [highlightedItemId, setHighlightedItemId] = useState(null); // State to track highlighted item
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const itemsPerPage = 10;

  // Calculate the total number of pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Calculate the data to be displayed on the current page
    //const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const paginatedData = useMemo(() => {
        return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [data, currentPage, itemsPerPage]);
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleOpen = (itemName) => {
        setOpen(true);
        setSelectedItemName(itemName);
    };
    const handleClose = () => setOpen(false);


    const handleSelectItem = (itemName) => {
        const selectedIndex = selectedItems.indexOf(itemName);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedItems, itemName);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedItems.slice(1));
        } else if (selectedIndex === selectedItems.length - 1) {
        newSelected = newSelected.concat(selectedItems.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selectedItems.slice(0, selectedIndex),
            selectedItems.slice(selectedIndex + 1)
        );
        }

        setSelectedItems(newSelected);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    const scrollToCharacter = (character) => {
        if (character != "") {
        let index = data.findIndex(item => String(item.id).toLowerCase().startsWith(character.toLowerCase()));
        if (index === -1) {
            index = data.findIndex((item) => {
                const value = Object.values(item);
                return value[1].toLowerCase().startsWith(character);
            });
        }
        if (index !== -1) {
            setShowMessage(false);
            const pageNumber = Math.floor(index / itemsPerPage) + 1;
            setCurrentPage(pageNumber);
        
            // Wait for the page to update before scrolling into view
            setTimeout(() => {
                const tableRow = document.getElementById(`row-${data[index].id}`);
                if (tableRow) {
                    tableRow.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 0);
            setHighlightedItemId(data[index].id);
        }
        if(index === -1) {
            // alert("No data found");
            setHighlightedItemId(null);
            setMessage("Data not found");
            setShowMessage(true);
        }
        console.log(index);
        }
    };

    const HandleDeleteItem = async (itemToDelete) => {
        try {
        if (Array.isArray(itemToDelete)) {
            for (const item of itemToDelete) {
            console.log("th1: " + item);
            const data = {
                id: item,
            };
            
            await handleDelete(data.id).then((res) => {
                console.log(res);
                if (res.success) {
                console.log("Delete success");
                } else {
                console.log("Delete failed");
                }
            });
            }
        } else {
            console.log("th2: " + itemToDelete);
            const data = {
            id: itemToDelete,
            };
            // console.log(data);
            await handleDelete(data.id).then((res) => {
                console.log(res);
            if (res.success) {
                console.log("Delete success");
            } else {
                console.log("Delete failed");
            }
            });
        }
        const response = await getAllData().then((res) => {
            // console.log(res);
            return res;
        });
        setData(response);
        // console.log(response.data);
        } catch (error) {
        console.error("Failed to delete accounts:", error);
        }
        setOpen(false);
    };
    return (
        <Box sx={{ margin: "2em" }}>
        <Stack
            direction="row"
            sx={{ marginBottom: "2em" }}
            justifyContent="center"
        >
            <Box width="60%" sx={{ color: 'red' }}>
            {/* <Container header={"Admin"} ></Container> */}
            </Box>
            <Stack direction="row" spacing={1}  width="50%">
                <Stack direction="column" spacing={1} alignItems={'center'} width={'80%'}>
                    <TextField
                        label="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                        sx={{ marginBottom: "1em", width: "78%" }}
                        onKeyPress={(event) => {
                        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
                            event.preventDefault();
                            scrollToCharacter(searchText);
                        }
                        }}
                    />
                    {showMessage && <Typography variant="h10" color="error">{message}</Typography>}
                </Stack>
            <IconButton
                onClick={() => scrollToCharacter(searchText)}
                size="large"
                aria-label="delete"
            >
                <SearchIcon />
            </IconButton>
            </Stack>
        </Stack>
        
        <Table>
            <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < data.length
                    }
                    checked={selectedItems.length === data.length}
                    onChange={() => {
                    if (selectedItems.length === data.length) {
                        setSelectedItems([]);
                    } else {
                        setSelectedItems(data.map((item) => item.id));
                    }
                    }}
                />
                </TableCell>
                {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                ))}
                {/* <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User Role</TableCell> */}
                
                <TableCell>
                <Button
                    onClick={() => handleOpen(selectedItems)}
                    size="small"
                    aria-label="delete"
                >
                    Delete
                </Button>
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
               
            {paginatedData.map((item) => (
                <TableRow key={item.id} id={`row-${item.id}`} style={{ backgroundColor: item.id === highlightedItemId ? 'yellow' : 'transparent' }}>
                <TableCell padding="checkbox">
                    <Checkbox
                    checked={selectedItems.indexOf(item.id) !== -1}
                    onChange={() => handleSelectItem(item.id)}
                    />
                </TableCell>
                {/* <TableCell key={column[1].id}>{item.id}</TableCell> */}
                {columns.map((column) => (
                    <TableCell key={column.id}>{item[column.id]}</TableCell>
                ))}
                <TableCell>
                    <IconButton
                    onClick={() => handleOpen(item.id)}
                    aria-label="delete"
                    >
                    <DeleteIcon />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
            </Button>
            <Box mx={2}>Page {currentPage} of {totalPages}</Box>
            <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            Next
            </Button>
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
            }}
            >
            <Typography
                sx={{ ...uiConfigs.style.typoLines(2, "center") }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
            >
                Are you sure to delete account{" "}
                <b>
                {Array.isArray(selectedItemName)
                    ? selectedItemName.join(", ")
                    : selectedItemName}
                </b>
                ?
            </Typography>
            <Stack marginTop="2em" direction="row" justifyContent="space-evenly">
                <Button
                onClick={() => HandleDeleteItem(selectedItemName)}
                variant="outlined"
                size="medium"
                >
                Yes
                </Button>
                <Button onClick={handleClose} variant="outlined" size="medium">
                No
                </Button>
            </Stack>
            </Box>
        </Modal>
        </Box>
    );
    }

export default Management;
