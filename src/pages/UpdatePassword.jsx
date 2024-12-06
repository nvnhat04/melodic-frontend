import React, { useEffect, useState } from "react";
// import accountApi from "../../api/modules/account.api.js";
import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import { Typography } from "@mui/material";
import { Box, Stack, TextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// import { ToastContainer, toast } from "react-toastify";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@mui/material";
import { FilledInput } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
    const { username } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  
    const handleClickShowOldPassword = () => setShowOldPassword((prev) => !prev);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () =>
      setShowConfirmNewPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (formData.newPassword !== formData.confirmNewPassword) {
        console.log("New password and confirm new password do not match");
        return;
      }
      if (formData.newPassword.length < 6) {
        console.log("Password must be at least 6 characters");
        return;
      }
      if (formData.newPassword === formData.oldPassword) {
        console.log("New password must be different from old password");
        return;
      }
      // API logic here
    };
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
  
    return (
      <Box
        padding="2em"
        display="flex"
        justifyContent="left"
        alignItems="left"
        sx={{
          height: "100vh",
          backgroundColor: "#121212", // Nền đen
          color: "#f5f5f5", // Màu chữ trắng sáng
        }}
      >
        <Stack direction="column" spacing={4} width="100%" maxWidth="600px">
          <Container header="Update Password">
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={3}>
                {/* Old Password */}
                <Typography variant="h6" sx={{ color: "#f5f5f5" }}>
                  Old Password
                </Typography>
                <FormControl
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      color: "#f5f5f5", // Màu chữ trong input
                    },
                    "& .MuiInputLabel-root": {
                      color: "red", // Màu label
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#777", // Màu viền
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent", // Viền khi hover
                    },
                  }}
                >
                  <InputLabel htmlFor="old-password">Old Password</InputLabel>
                  <OutlinedInput
                    id="old-password"
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "#f5f5f5" }}
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
  
                {/* New Password */}
                <Typography variant="h6" sx={{ color: "#f5f5f5" }}>
                  New Password
                </Typography>
                <FormControl
                  variant="outlined"
                  sx={{
                    m: 1,
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      color: "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#bbb",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#777",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f5f5f5",
                    },
                  }}
                >
                  <InputLabel htmlFor="new-password">Password</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "#f5f5f5" }}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
  
                {/* Confirm New Password */}
                <Typography variant="h6" sx={{ color: "#f5f5f5" }}>
                  Confirm New Password
                </Typography>
                <FormControl
                  variant="outlined"
                  sx={{
                    m: 1,
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      color: "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#bbb",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#777",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f5f5f5",
                    },
                  }}
                >
                  <InputLabel htmlFor="confirm-password">Password</InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "#f5f5f5" }}
                        >
                          {showConfirmNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
  
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    width: "max-content",
                    backgroundColor: "#bb2525", // Màu đỏ đậm
                    "&:hover": {
                      backgroundColor: "#d32f2f", // Màu khi hover
                    },
                  }}
                  startIcon={<SendOutlinedIcon />}
                >
                  Update
                </Button>
              </Stack>
            </form>
          </Container>
        </Stack>
      </Box>
    );
  }
  
  export default UpdatePassword;
  