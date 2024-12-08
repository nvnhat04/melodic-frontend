import React, { useState } from "react";
import { Box, Typography, Button, Tabs, Tab, Divider } from "@mui/material";
import TopBar from "../components/common/Topbar";
import { Link, useNavigate } from "react-router-dom";

const OrderHistory = () => {
  // Dữ liệu mock đơn hàng
  const mockOrders = [
    {
      id: 1,
      merchandises: [
        {
          name: "Áo thun nam",
          id: 1,
          price: 25,
          quantity: 2,
          image: "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
        },
        {
          name: "Quần jeans nữ",
          id: 2,
          price: 30,
          quantity: 1,
          image: "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
        },
      ],
      status: "Cancelled",
    },
    {
      id: 2,
      merchandises: [
        {
          name: "Giày thể thao",
          id: 2,
          price: 50,
          quantity: 1,
          image: "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
        },
      ],
      status: "Completed",
    },
    {
      id: 3,
      merchandises: [
        {
          name: "Áo thun nam",
          price: 25,
          quantity: 3,
          image: "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
        },
        {
          name: "Quần jeans nữ",
          price: 30,
          quantity: 1,
          image: "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
        },
      ],
      status: "To Receive",
    },
  ];

  // Trạng thái lọc
  const [filterStatus, setFilterStatus] = useState("All");
  
  // Điều hướng
  const navigate = useNavigate();

  // Xử lý khi nhấn tab
  const handleTabChange = (event, newValue) => {
    setFilterStatus(newValue);
  };

  // Lọc dữ liệu theo trạng thái
  const filteredOrders =
    filterStatus === "All"
      ? mockOrders
      : mockOrders.filter((order) => order.status === filterStatus);

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
                backgroundColor: "#e75565", // Đổi màu dấu gạch chân thành đỏ
              },
            }}
          >
            <Tab
              label="All"
              value="All"
              disableRipple
              sx={{
                width: "20%",
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
                width: "20%",
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
                width: "20%",
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
                width: "20%",
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
                width: "20%",
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
          {filteredOrders.map((order) => {
            const orderTotal = order.merchandises.reduce(
              (total, merchandise) =>
                total + merchandise.price * merchandise.quantity,
              0
            ); // Tính tổng giá trị đơn hàng
            return (
              <Box
                key={order.id}
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

                {/* Danh sách sản phẩm trong đơn hàng */}
                {order.merchandises.map((merchandise, index) => (
                  <Link
                    key={index}
                    to={`/shop/merchandise/${merchandise.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1vw",
                      }}
                    >
                      <img
                        src={merchandise.image}
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
                    </Box>
                  </Link>
                ))}

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
                    onClick={() => handleBuyAgain(order)}  // Sử dụng hàm xử lý
                    sx={{
                      backgroundColor: "#d0011b",
                      color: "white",
                      fontSize: { xs: "3vw", sm: "2vw", md: "1vw" },
                      "&:hover": { backgroundColor: "rgba(208,1,27, 0.9)" },
                    }}
                  >
                    Buy Again
                  </Button>
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
    </Box>
  );
};

export default OrderHistory;
