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
import { setBalance } from "../redux/store";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderApi from "../api/modules/order.api";
import AccountApi from "../api/modules/account.api";
import CartApi from "../api/modules/cart.api";
import MerchandiseApi from "../api/modules/merchandise.api";
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createUrl from "../hooks/createUrl";
const CheckOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliveryMethods, setDeliveryMethods] = useState({});
  const { selectedProducts, total, fromCart } = location.state || {
    selectedProducts: [],
    total: 0,
    fromCart: false,
  };

  const { user_id, display_name, phone, address, balance, token } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState(display_name || "");
  const [phoneNumber, setPhone] = useState(phone || "");
  const [userAddress, setAddress] = useState(address || "");
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const groupByArtist = (products) => {
    return products.reduce((groups, product) => {
      const artistId = product.artist_id;
      const artistName = product.artist_name;
      if (!groups[artistId]) {
        groups[artistId] = {
          artistName: artistName,
          products: [],
        };
      }

      groups[artistId].products.push(product);

      return groups;
    }, {});
  };

  const groupedProducts = groupByArtist(selectedProducts);
  const handlePlaceOrder = async () => {
    try {
      let totalCost = 0;
      const orderDetails = [];

      // Iterate over each artist's grouped products
      for (const artistId in groupedProducts) {
        const artistProducts = groupedProducts[artistId].products;
        const artistDeliveryMethod = deliveryMethods[artistId] || "standard"; // Default to "standard" if not set

        // Calculate the total cost for this artist/store
        const artistTotal = artistProducts.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );
        const deliveryCost = artistDeliveryMethod === "express" ? 10 : 5;
        const artistTotalCost = artistTotal + deliveryCost;

        totalCost += artistTotalCost; // Add this artist's total cost to the overall total

        // Prepare the order details for this artist/store
        const order = {
          user_id,
          deliveryMethod: artistDeliveryMethod,
          name,
          phone: phoneNumber,
          address: userAddress,
          total: artistTotalCost,
        };

        // Create the order for this artist
        const createdOrder = await OrderApi.createOrderByUserId(order, token);
        // Add the products for this artist to the created order
        await Promise.all(
          artistProducts.map(async (product) => {
            const productDetails = {
              order_id: createdOrder.data, 
              id: product.id || product.merchandise_id,
              quantity: product.quantity,
              price: product.price,
            };

            // Add product to the order
            await OrderApi.addToOrderMerchandise(productDetails, token);
            await MerchandiseApi.updateStock(productDetails.id, product.quantity);

            if (fromCart) {
              await CartApi.deleteItem(user_id, product.id);
            }
          })
        );
        // Add order info for later balance update
        orderDetails.push({ createdOrder, artistTotalCost });
      }

      // Check if the total cost is within the available balance
      if (totalCost > balance) {
        toast.error("Insufficient balance to complete the purchase.");
        return;
      }

      // Update the user's balance after all orders are placed
      const newBalance = balance - totalCost;
      const balanceUpdateResult = await AccountApi.updateBalance(user_id, {
        new_balance: newBalance,
      });

      if (balanceUpdateResult.success) {
        // Update balance in Redux
        dispatch(setBalance(newBalance));
        toast.success("Order(s) placed successfully!");
        setTimeout(() => {
          navigate("/shop", { replace: true });
        }, 3000);
      } else {
        toast.error("Failed to update balance.");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place the order. Please try again.");
    }
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
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
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
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={userAddress}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                    sx={{
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" },
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
                    <strong>Phone:</strong> {phoneNumber}
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Address:</strong> {userAddress}
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
            {Object.keys(groupedProducts).map((artistId) => (
              <Box
                backgroundColor={"white"}
                padding={"2vw"}
                key={artistId}
                sx={{ marginBottom: "3vw", marginLeft: "3vw" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                    fontSize: { xs: "3vw", sm: "2.5vw", md: "1.5vw" },
                  }}
                >
                  {groupedProducts[artistId].artistName}'s Store
                </Typography>
                <Box sx={{ marginBottom: "2vw" }}>
                  {groupedProducts[artistId].products.map(
                    (merchandise, index) => (
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
                            src={createUrl(merchandise.image)}
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
                                fontSize: {
                                  xs: "3.5vw",
                                  sm: "2.5vw",
                                  md: "1.5vw",
                                },
                                fontWeight: "bold",
                              }}
                            >
                              {merchandise.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "3.5vw",
                                  sm: "2.5vw",
                                  md: "1.5vw",
                                },
                                color: "gray",
                              }}
                            >
                              {merchandise.quantity} x {merchandise.price}$ ={" "}
                              {merchandise.quantity * merchandise.price}$
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    )
                  )}
                </Box>
                <Box sx={{ marginBottom: "2vw" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      fontSize: { xs: "3vw", sm: "2.5vw", md: "1.5vw" },
                    }}
                  >
                    Delivery Method
                  </Typography>
                  <Box
                    backgroundColor={"white"}
                    padding={{ md: "1vw", xs: "3vw" }}
                  >
                    <RadioGroup
                      value={deliveryMethods[artistId] || "standard"}
                      onChange={(e) => {
                        setDeliveryMethods({
                          ...deliveryMethods,
                          [artistId]: e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="standard"
                        control={<Radio />}
                        label="Standard Delivery (5$)"
                        sx={{
                          fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
                        }}
                      />
                      <FormControlLabel
                        value="express"
                        control={<Radio />}
                        label="Express Delivery (10$)"
                        sx={{
                          fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
                        }}
                      />
                    </RadioGroup>
                  </Box>
                </Box>
              </Box>
            ))}

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
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
                }}
              >
                Total:{" "}
                {Object.keys(groupedProducts).reduce((totalCost, artistId) => {
                  const shippingCost =
                    deliveryMethods[artistId] === "express" ? 10 : 5;
                  const artistTotal = groupedProducts[artistId].products.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  );
                  return totalCost + artistTotal + shippingCost;
                }, 0)}
                $
              </Typography>

              <Typography
                sx={{
                  color: "gray",

                  fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                }}
              >
                Your balance: {balance}$
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
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        transition={Slide}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
      />{" "}
      <ToastContainer
        position="top-center"
        autoClose={1000}
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
};

export default CheckOutPage;
