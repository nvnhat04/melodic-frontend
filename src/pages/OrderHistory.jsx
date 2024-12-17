import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Tabs, Tab, Divider } from "@mui/material";
import OrderApi from "../api/modules/order.api";
import AccountApi from "../api/modules/account.api";
import { setBalance } from "../redux/store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import createUrl from "../hooks/createUrl";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const OrderHistory = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const userId = useSelector((state) => state.auth.user_id);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user_id, balance } = useSelector((state) => state.auth);
  const groupOrders = (orders) => {
    return orders.reduce((acc, order) => {
      // Find the order group with the same order_id
      const existingOrder = acc.find((o) => o.order_id === order.order_id);
      // If the order already exists, add the merchandise to the existing order
      if (existingOrder) {
        existingOrder.merchandises.push({
          merchandise_id: order.merchandise_id,
          quantity: order.quantity,
          price_each: order.price_each,
          name: order.name,
          artist_id: order.artist_id,
          stock: order.stock,
          album_id: order.album_id,
          price: order.price,
          description: order.description,
          image: order.image,
          created_at: order.created_at,
          category: order.category,
        });
      } else {
        // If the order doesn't exist, create a new group for this order
        acc.push({
          order_id: order.order_id,
          status: order.status,
          merchandises: [
            {
              merchandise_id: order.merchandise_id,
              quantity: order.quantity,
              price_each: order.price_each,
              name: order.name,
              artist_id: order.artist_id,
              stock: order.stock,
              album_id: order.album_id,
              price: order.price,
              description: order.description,
              image: order.image,
              created_at: order.created_at,
              category: order.category,
            },
          ],
        });
      }
      return acc;
    }, []);
  };
  const handleOpenDialog = (orderId) => {
    setSelectedOrder(orderId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleConfirmCancel = async () => {
    if (selectedOrder) {
      try {
        const response = await OrderApi.updateStatus(
          selectedOrder.order_id,
          "cancelled"
        );
        if (response.success) {
          const totalCost = selectedOrder.merchandises.reduce(
            (total, merchandise) =>
              total + merchandise.price * merchandise.quantity,
            0
          );
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.order_id === selectedOrder.order_id
                ? { ...order, status: "cancelled" }
                : order
            )
          );
          // order.merchandise.map (sử dụng merchandise.quantity và price_each để tính totalCost)
          const newBalance = Number(balance) + Number(totalCost)
          const balanceUpdateResult = await AccountApi.updateBalance(user_id, {
            new_balance: newBalance,
          });
          if (balanceUpdateResult.success) {
            dispatch(setBalance(newBalance));
          } else {
            console.error("Failed to update balance.");
          }
        } else {
          console.error("Failed to cancel the order:", response.message);
        }
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
    handleCloseDialog(); // Close dialog after confirmation
  };

  // Fetch orders when the component is mounted or when the userId changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderApi.getAllOrderByUserId(userId);

        if (response.success) {
          const groupedOrders = groupOrders(response.data);
          setOrders(groupedOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // If there's an error, set empty array
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setFilterStatus(newValue);
  };

  useEffect(() => {
    if (Orders) {
      setFilteredOrders(
        filterStatus === "All"
          ? Orders
          : Orders.filter(
              (order) =>
                order.status.toLowerCase() === filterStatus.toLowerCase()
            )
      );
    }
  }, [Orders, filterStatus]);
  // Xử lý khi nhấn nút "Buy Again"
  const handleBuyAgain = (order) => {
    const orderData = {
      selectedProducts: order.merchandises,
      total: order.merchandises.reduce(
        (total, merchandise) =>
          total + merchandise.price * merchandise.quantity,
        0
      ),
    };
    navigate("/shop/checkout", { state: orderData });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        paddingBottom: "5vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: "90%", margin: "2% 5%" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "1vw",
            fontWeight: "Bold",
            fontSize: {
              md: "3vw",
              xs: "4vw",
            },
          }}
        >
          Order History
        </Typography>
        {/* tabs */}
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1vw" }}
        >
          <Tabs
            value={filterStatus}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              "& .MuiTabs-indicator": {
                backgroundColor: "#e75565",
              },
            }}
          >
            <Tab
              label="All"
              value="All"
              disableRipple
              sx={{
                width: { md: "16.5%" },
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="To Ship"
              value="To Ship"
              disableRipple
              sx={{
                width: "16.5%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="Shipping"
              value="Shipping"
              disableRipple
              sx={{
                width: "16.5%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="To Receive"
              value="To Receive"
              disableRipple
              sx={{
                width: "16.5%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="Completed"
              value="Completed"
              disableRipple
              sx={{
                width: "16.5%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="Cancelled"
              value="Cancelled"
              disableRipple
              sx={{
                width: "16.5%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
          </Tabs>
        </Box>

        {/* Danh sách đơn hàng */}
        <Box position={"relative"}>
          {filteredOrders.map((order, index) => {
            const orderTotal = order.merchandises.reduce(
              (total, merchandise) =>
                total + merchandise.price * merchandise.quantity,
              0
            );
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  padding: "1vw",
                  marginBottom: "1vw",
                  borderRadius: "6px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "2.7vw", sm: "2vw", md: "1.3vw" },
                    marginBottom: "1vw",
                    position: "absolute",
                    right: 20,
                    textTransform: "uppercase",
                    color: "#e75565",
                  }}
                >
                  {order.status}
                </Typography>

                <Link
                  key={order.order_id}
                  to={`/shop/order/${order.order_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {order.merchandises.map((merchandise, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1vw",
                      }}
                    >
                      <Link
                        to={`/shop/merchandise/${merchandise.merchandise_id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "1vw",
                        }}
                      >
                        <img
                          src={createUrl(merchandise.image)}
                          alt={merchandise.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginRight: "1vw",
                            borderRadius: "6px",
                          }}
                        />

                        <Box>
                          <Typography
                            sx={{
                              fontSize: { xs: "3.5vw", sm: "2vw", md: "1.2vw" },
                            }}
                          >
                            {merchandise.name}{" "}
                            <Typography
                              component="span"
                              sx={{ fontSize: "0.9em", color: "gray" }}
                            >
                              x{merchandise.quantity}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: "3vw", sm: "1.8vw", md: "1vw" },
                              color: "gray",
                            }}
                          >
                            {merchandise.price * merchandise.quantity} $
                          </Typography>
                        </Box>
                      </Link>
                    </Box>
                  ))}
                </Link>
                <Divider sx={{ margin: "1vw 0" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "3vw", sm: "2vw", md: "1.2vw" },
                      color: "#000",
                      marginRight: "3vw",
                    }}
                  >
                    Order Total: {orderTotal} $
                  </Typography>
                  <Button
                    onClick={() => handleBuyAgain(order)} // Sử dụng hàm xử lý
                    sx={{
                      backgroundColor: "#d0011b",
                      color: "white",
                      fontSize: { xs: "3vw", sm: "2vw", md: "1vw" },
                      "&:hover": { backgroundColor: "rgba(208,1,27, 0.9)" },
                    }}
                  >
                    Buy Again
                  </Button>
                  {order.status === "to ship" && (
                    <Button
                      onClick={() => handleOpenDialog(order)}
                      sx={{
                        backgroundColor: "#d0011b",
                        color: "white",
                        fontSize: { xs: "3vw", sm: "2vw", md: "1vw" },
                        "&:hover": { backgroundColor: "rgba(208,1,27, 0.9)" },
                        marginLeft: "3vw",
                      }}
                    >
                      Cancel Order
                    </Button>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>

        {filteredOrders.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "3.5vw", sm: "2vw", md: "1.2vw" },
              color: "gray",
            }}
          >
            No orders found.
          </Typography>
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography>Are you sure you want to cancel this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="#d0011b">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderHistory;
