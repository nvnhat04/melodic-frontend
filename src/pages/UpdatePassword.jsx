import React, { useEffect, useState } from "react";
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
import AccountAPI from "../../src/api/modules/account.api.js"
import {useSelector} from "react-redux";
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePassword() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);
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
        toast.error("New password and confirm new password do not match");
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      if (formData.newPassword === formData.oldPassword) {
        toast.error("New password must be different from old password");
        return;
      }

      const { oldPassword, newPassword } = formData;
      // API logic here
      AccountAPI.changePassword(id, { oldPassword, newPassword }, token)
    .then((response) => {
      console.log(response.success);
      if (response.success === false) {
        toast.error("Old password is incorrect");
      }
       else if (response.success == true) {
        toast.success("Password updated successfully");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        toast.error("Failed to update password");
      }
    })
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
                    // "& .MuiInputLabel-root": {
                    //   color: "red", // Màu label
                    // },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray", // Màu viền
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red", // Viền khi hover
                    },
                    // hide the label
                    "& .MuiInputLabel-outlined": {
                      display: "none",
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
                    required
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
                      color: "#f5f5f5", // Màu chữ trong input
                    },
                    // "& .MuiInputLabel-root": {
                    //   color: "red", // Màu label
                    // },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray", // Màu viền
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red", // Viền khi hover
                    },
                    // hide the label
                    "& .MuiInputLabel-outlined": {
                      display: "none",
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
                    required
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
                      color: "#f5f5f5", // Màu chữ trong input
                    },
                    // "& .MuiInputLabel-root": {
                    //   color: "red", // Màu label
                    // },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray", // Màu viền
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red", // Viền khi hover
                    },
                    // hide the label
                    "& .MuiInputLabel-outlined": {
                      display: "none",
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
                    required
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
        <ToastContainer
                      position="top-right"
                      autoClose={2000}
                      hideProgressBar={true}
                      transition={Slide}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      closeButton={false}
                    />
      </Box>
    );
  }
  
  export default UpdatePassword;
  