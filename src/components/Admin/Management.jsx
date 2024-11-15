import React, { useEffect, useState } from "react";

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

function Management({accountApi, data = [], columns =[]}) {
    // const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] =useState(false);
    const [selectedItemName, setSelectedItemName] = useState("");
    const handleOpen = (itemName) => {
        setOpen(true);
        setSelectedItemName(itemName);
    };
    const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     // const fetchUsers = async () => {
    //     // try {
    //     //     // const response = await accountApi.getAllUsers();
    //     //     setUsers(userdata);
    //     // } catch (error) {
    //     //     console.error("Failed to fetch users:", error);
    //     // }
    //     // };

    //     // fetchUsers();
    //     setData(Array.isArray(listData) ? listData : []);
    // }, []);

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
        let index = data.findIndex((user) =>
            user.username.toLowerCase().startsWith(character)
        );
        if (index === -1) {
            index = data.findIndex((user) =>
            user.name.toLowerCase().startsWith(character)
            );
        }
        if (index === -1) {
            index = data.findIndex((user) =>
            user.email.toLowerCase().startsWith(character)
            );
        }
        if (index !== -1) {
            const tableRow = document.getElementById(
            `row-${data[index].username}`
            );
            if (tableRow) {
            tableRow.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        }
    };

    const HandleDeleteAccounts = async (itemToDelete) => {
        try {
        if (Array.isArray(itemToDelete)) {
            for (const user of itemToDelete) {
            console.log("th1: " + user);
            const data = {
                username: user,
            };
            console.log('Delete successfully');
            // await accountApi.adminDeleteAccount(JSON.stringify(data));
            }
        } else {
            console.log("th2: " + itemToDelete);
            const data = {
            username: itemToDelete,
            };
            console.log('Delete successfully');
            // await accountApi.adminDeleteAccount(data).then((res) => {
            // if (res.success) {
            //     console.log("Delete success");
            // } else {
            //     console.log("Delete failed");
            // }
            // });
        }
        // const response = await accountApi.getAlldata();
        // setdata(response.data);
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
            <Box width="50%">
            <Container header={"Admin"}></Container>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center" width="50%">
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
                        setSelectedItems(data.map((user) => user.username));
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
               
            {data.map((item) => (
                <TableRow key={item.id} id={`row-${item.id}`}>
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

                {/* <TableCell>{item.id}</TableCell>
                <TableCell>{item.itemname}</TableCell>
                <TableCell>{item.display_name}</TableCell>
                <TableCell>{item.date_of_birth}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.item_role}</TableCell> */}
                <TableCell>
                    <IconButton
                    onClick={() => handleOpen(item.itemname)}
                    aria-label="delete"
                    >
                    <DeleteIcon />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
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
                onClick={() => HandleDeleteAccounts(selectedItemName)}
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
