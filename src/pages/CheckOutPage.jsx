import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import TopBar from "../components/common/Topbar";
import { useLocation, useNavigate, Link } from "react-router-dom";

const CheckOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedProducts, total } = location.state || {
    selectedProducts: [],
    total: 0,
  };

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [name, setName] = useState("Long");
  const [phone, setPhone] = useState("(+84) 9332211");
  const [address, setAddress] = useState(
    "Xã Tráng Việt, Huyện Mê Linh, Hà Nội"
  );
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    console.log("Order placed:", {
      selectedProducts,
      total,
      deliveryMethod,
      name,
      phone,
      address,
      paymentMethod,
    });
    setOrderPlaced(true);

    setTimeout(() => {
      navigate("/shop");
    }, 3000);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: "90%", margin: "2% 5%" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
            fontWeight: "Bold",
            fontSize: { md: "3vw", xs: "4vw" },
          }}
        >
          Checkout
        </Typography>

        {selectedProducts.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "2vw",
              fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
            }}
          >
            No items selected for checkout.
          </Typography>
        ) : (
          <Box>
            {/* User Information Section */}
            <Box sx={{ marginBottom: "2vw" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                }}
              >
                Delivery Information
              </Typography>
              {isEditingInfo ? (
                <Box
                  backgroundColor={"white"}
                  padding={{ md: "1vw", xs: "3vw" }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                    sx={{
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <Button
                    onClick={() => setIsEditingInfo(false)}
                    sx={{
                      marginTop: { md: "1vw", xs: "2vw" },
                      backgroundColor: "#d0011b",
                      paddingRight: { md: "3vw", xs: "5vw" },
                      paddingLeft: { md: "3vw", xs: "5vw" },
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(208,1,27, 0.9)",
                      },
                      fontSize: { xs: "2vw", sm: "1.5vw", md: "1.1vw" }, // Cập nhật font-size cho responsive
                    }}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Box
                  backgroundColor={"white"}
                  padding={{ md: "1vw", xs: "3vw" }}
                >
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Name:</strong> {name}
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Phone:</strong> {phone}
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Address:</strong> {address}
                  </Typography>
                  <Button
                    onClick={() => setIsEditingInfo(true)}
                    sx={{
                      marginTop: { md: "1vw", xs: "2vw" },
                      backgroundColor: "#d0011b",
                      paddingRight: { md: "3vw", xs: "5vw" },
                      paddingLeft: { md: "3vw", xs: "5vw" },
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(208,1,27, 0.9)",
                      },
                      fontSize: { xs: "2vw", sm: "1.5vw", md: "1.1vw" },
                    }}
                  >
                    Change
                  </Button>
                </Box>
              )}
            </Box>

            {/* Product Review Section */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                fontSize: { xs: "3.5vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
              }}
            >
              Product Ordered
            </Typography>
            <Box sx={{ marginBottom: "2vw" }}>
              {selectedProducts.map((merchandise, index) => (
                <Link
                  key={index}
                  to={`/shop/merchandise/${
                    merchandise.id || merchandise.merchandise_id
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      padding: { md: "1vw", xs: "3vw" },
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      component="img"
                      src={merchandise.image}
                      alt={merchandise.name}
                      sx={{
                        width: { md: "15vw", sm: "22.5vw", xs: " 30vw" },
                        height: { md: "15vw", sm: "22.5vw", xs: "30vw" },
                        objectFit: "cover",
                        marginRight: "2vw",
                        borderRadius: "6px",
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.5vw" },
                          fontWeight: "bold",
                        }}
                      >
                        {merchandise.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.5vw" },
                          color: "gray",
                        }}
                      >
                        {merchandise.quantity} x {merchandise.price}$ ={" "}
                        {merchandise.quantity * merchandise.price}$
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>

            {/* Delivery Method Section */}
            <Box sx={{ marginBottom: "2vw" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                  fontSize: { xs: "3.5vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                }}
              >
                Delivery Method
              </Typography>
              <Box backgroundColor={"white"} padding={{ md: "1vw", xs: "3vw" }}>
                <RadioGroup
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard Delivery (5$)"
                    sx={{
                      fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <FormControlLabel
                    value="express"
                    control={<Radio />}
                    label="Express Delivery (10$)"
                    sx={{
                      fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                </RadioGroup>
              </Box>
            </Box>

            {/* Payment Method Section */}
            <Box sx={{ marginBottom: "2vw" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                  fontSize: { xs: "3.5vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                }}
              >
                Payment Method
              </Typography>
              <Box backgroundColor={"white"} padding={{ md: "1vw", xs: "3vw" }}>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="credit-card"
                    control={<Radio />}
                    label="Credit Card"
                    sx={{
                      fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <FormControlLabel
                    value="cash-on-delivery"
                    control={<Radio />}
                    label="Cash on Delivery"
                    sx={{
                      fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                </RadioGroup>
              </Box>
            </Box>

            {/* Total and Place Order Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                padding: { md: "2vw", xs: "3vw" },
                borderRadius: "6px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
                }}
              >
                Total: {total + (deliveryMethod === "express" ? 10 : 5)}$
              </Typography>
              <Button
                onClick={handlePlaceOrder}
                sx={{
                  backgroundColor: "#d0011b",
                  color: "white",
                  fontSize: { xs: "3vw", sm: "2vw", md: "1.3vw" },
                  paddingRight: { md: "3vw", xs: "5vw" },
                  paddingLeft: { md: "3vw", xs: "5vw" },
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        )}

        {orderPlaced && (
          <Typography
            sx={{
              textAlign: "center",
              color: "green",
              marginTop: "2vw",
              fontWeight: "bold",
              fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
            }}
          >
            Order successfully placed! Redirecting to shop...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CheckOutPage;
