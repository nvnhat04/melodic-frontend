import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TopBar from "../components/common/Topbar";
import { Navigate, useNavigate } from "react-router-dom";

const CartPage = () => {
  const mockMer = [
    {
      id: 1,
      name: "Áo thun nam",
      price: 25,
      merchImg:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 2,
      name: "Quần jeans nữ",
      price: 30,
      merchImg:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 3,
      name: "Giày thể thao",
      price: 50,
      merchImg:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
  ];
  const navigate = useNavigate();
  // Mock giỏ hàng (mockCart)
  const [mockCart, setMockCart] = useState([
    { user_id: 1, merchandise_id: 1, quantity: 2 },
    { user_id: 1, merchandise_id: 2, quantity: 1 },
    { user_id: 1, merchandise_id: 1, quantity: 2 },
    { user_id: 1, merchandise_id: 2, quantity: 1 },
    { user_id: 1, merchandise_id: 1, quantity: 2 },
    { user_id: 1, merchandise_id: 2, quantity: 1 },
    { user_id: 1, merchandise_id: 1, quantity: 2 },
    { user_id: 1, merchandise_id: 2, quantity: 1 },
    { user_id: 1, merchandise_id: 1, quantity: 2 },
    { user_id: 1, merchandise_id: 2, quantity: 1 },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  // Hàm lấy thông tin sản phẩm từ mockMer
  const getProductDetails = (merchandise_id) => {
    return mockMer.find((product) => product.id === merchandise_id);
  };

  // Hàm tính toán giỏ hàng với đầy đủ thông tin sản phẩm
  const getCartDetails = () => {
    return mockCart.map((item) => {
      const productDetails = getProductDetails(item.merchandise_id);
      return {
        merchandise_id: item.merchandise_id,
        quantity: item.quantity,
        price: productDetails.price,
        merchImg: productDetails.merchImg,
        name: productDetails.name,
      };
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(cartDetails.map((item) => item.merchandise_id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelection = (merchandise_id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(merchandise_id)
        ? prevSelected.filter((id) => id !== merchandise_id)
        : [...prevSelected, merchandise_id]
    );
  };
  const handletoShop = () => {
    navigate("/shop")
  }
  // Hàm xử lý thay đổi số lượng
  const updateQuantity = (merchandise_id, quantity) => {
    setMockCart((prevCart) =>
      prevCart.map((item) =>
        item.merchandise_id === merchandise_id ? { ...item, quantity } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItemFromCart = (merchandise_id) => {
    setMockCart((prevCart) =>
      prevCart.filter((item) => item.merchandise_id !== merchandise_id)
    );
  };
  const calculateTotal = () =>
    cartDetails.reduce((total, item) => {
      return selectedItems.includes(item.merchandise_id)
        ? total + item.price * item.quantity
        : total;
    }, 0);

  // Giỏ hàng hiện tại
  const cartDetails = getCartDetails();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <TopBar />
      <Box sx={{ width: "90%", margin: "2% 5%" }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: "1vw", fontWeight: "Bold", fontSize: "3vw" }}
        >
          Your Cart
        </Typography>

        {cartDetails.length > 0 && (
          <Box
            sx={{
              padding: "1vw",
              backgroundColor: "white",
              marginBottom: "1vw",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControlLabel
              sx={{ width: "5%", marginLeft: "0", marginRight: "0" }}
              control={
                <Box
                  sx={{
                    width: "3vw",
                    height: "3vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    checked={selectedItems.length === cartDetails.length}
                    onChange={handleSelectAll}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2vw", // Adjust the checkbox icon size within its container
                      },
                    }}
                  />
                </Box>
              }
            />

            <Box sx={{ width: "35%" }}>
              <Typography
                sx={{
                  fontWeight: "Medium",
                  fontSize: "1.25vw",
                  marginLeft: "0vw",
                }}
              >
                Product
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex -start",
              }}
            >
              <Typography
                sx={{ fontSize: "1.25vw", width: "25%", textAlign: "center" }}
              >
                Unit Price
              </Typography>
              <Typography
                sx={{ fontSize: "1.25vw", width: "35%", textAlign: "center" }}
              >
                Quantity
              </Typography>
              <Typography
                sx={{ fontSize: "1.25vw", width: "25%", textAlign: "center" }}
              >
                Total Price
              </Typography>
              <Typography
                sx={{ fontSize: "1.25vw", width: "15%", textAlign: "center" }}
              >
                Action
              </Typography>
            </Box>
          </Box>
        )}

        {cartDetails.length === 0 ? (
          <>
            <Typography sx={{ fontWeight: "Bold", fontSize: "1vw" }}>
              Your cart is currently empty.
            </Typography>
            <Button
              onClick={() => {
                handletoShop()
              }}
              disableRipple
              sx={{
                width: "15%",
                minWidth: "0",
                height: "3vw",
                color: "black",
                "&:hover": {
                  color: "red",
                  backgroundColor: "transparent",
                  opacity: 1,
                },
                "&:focus": {
                  backgroundColor: "transparent",
                  opacity: 1,
                },
                "&:active": {
                  backgroundColor: "transparent",
                  opacity: 1,
                },
              }}
            >
              <Typography sx={{ fontSize: "1vw", textTransform: "capitalize", fontWeight: "bold" }}>
                GO SHOPPING NOW
              </Typography>
            </Button>
          </>
        ) : (
          cartDetails.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                padding: "1vw",
                marginBottom: "1vw",
                borderRadius: "6px",
                width: "100%",
              }}
            >
              <Box sx={{ width: "5%" }}>
                <Box
                  sx={{
                    width: "3vw",
                    height: "3vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.merchandise_id)}
                    onChange={() => handleItemSelection(item.merchandise_id)}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2vw", // Adjust the checkbox icon size within its container
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", width: "35%" }}>
                <img
                  src={item.merchImg}
                  alt={item.name}
                  style={{
                    width: "5vw",
                    height: "5vw",
                    objectFit: "cover",
                    marginRight: "2vw",
                    borderRadius: "6px",
                  }}
                />
                <Typography sx={{ fontSize: "1.5vw" }}>{item.name}</Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "gray",
                    fontSize: "1vw",
                    width: "25%",
                    textAlign: "center",
                  }}
                >
                  {item.price} $
                </Typography>

                <Box
                  sx={{
                    width: "35%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    border="0.1vw gray solid"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "2vw",
                        width: "3vw",
                        borderRight: "0.1vw gray solid",
                      }}
                    >
                      <Button
                        disableRipple
                        onClick={() => {
                          updateQuantity(
                            item.merchandise_id,
                            item.quantity - 1
                          );
                        }}
                        disabled={item.quantity < 1}
                        sx={{
                          fontSize: "2vw",
                          width: "1.5vw",
                          minWidth: "0",
                          height: "1.5vw",
                          "& :hover": {
                            backgroundColor: "transparent",
                            opacity: 1,
                          },
                          "&:focus": {
                            color: "black",
                            backgroundColor: "transparent",
                            opacity: 1,
                          },
                          "&:active": {
                            color: "black",
                            backgroundColor: "transparent",
                            opacity: 1,
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            fontSize: "1vw",
                          }}
                        >
                          -
                        </Typography>
                      </Button>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "1vw",
                        fontWeight: "bold",
                        width: "4vw",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "2vw",
                        width: "3vw",
                        borderLeft: "0.1vw gray solid",
                      }}
                    >
                      <Button
                        disableRipple
                        onClick={() => {
                          updateQuantity(
                            item.merchandise_id,
                            item.quantity + 1
                          );
                        }}
                        sx={{
                          fontSize: "2vw",
                          minWidth: "0",
                          width: "1.5vw",
                          height: "1.5vw",
                          "& :hover": {
                            backgroundColor: "transparent",
                            opacity: 1,
                          },
                          "&:focus": {
                            color: "black",
                            backgroundColor: "transparent",
                            opacity: 1,
                          },
                          "&:active": {
                            color: "black",
                            backgroundColor: "transparent",
                            opacity: 1,
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1vw",
                            color: "black",
                          }}
                        >
                          {" "}
                          +{" "}
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  sx={{ fontSize: "1vw", width: "25%", textAlign: "center" }}
                >
                  {item.quantity * item.price}$
                </Typography>

                <Button
                  onClick={() => {
                    removeItemFromCart(item.merchandise_id);
                  }}
                  disableRipple
                  sx={{
                    width: "15%",
                    minWidth: "0",
                    height: "3vw",
                    color: "black",
                    "&:hover": {
                      color: "red",
                      backgroundColor: "transparent",
                      opacity: 1,
                    },
                    "&:focus": {
                      backgroundColor: "transparent",
                      opacity: 1,
                    },
                    "&:active": {
                      backgroundColor: "transparent",
                      opacity: 1,
                    },
                  }}
                >
                  <Typography
                    sx={{ fontSize: "1vw", textTransform: "capitalize" }}
                  >
                    Delete
                  </Typography>
                </Button>
              </Box>
            </Box>
          ))
        )}
        {cartDetails.length > 0 && (
          <Box
            sx={{
              padding: "1vw 1vw 1vw 0",
              backgroundColor: "white",
              justifyContent: "flex-end",
              marginBottom: "0vw",
              display: "flex",
              alignItems: "center",
              width: "91%",
              position: "fixed",
              zIndex: "1000",
              bottom: "0",
            }}
          >
            <Typography
              sx={{ fontSize: "1.5vw", fontWeight: "Bold", margin: "3vw" }}
            >
              Total: {calculateTotal()} $
            </Typography>
            <Button
              sx={{
                backgroundColor: "#d0011b",
                color: "white",
                fontSize: "1.1vw",
                padding: "1vw 2vw",
                "&:hover": {
                  backgroundColor: "rgba(208,1,27, 0.9)",
                },
              }}
            >
              Check Out
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
