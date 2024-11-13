import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MerchandiseDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [type, setType] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 20;

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "BTS Official Lightstick",
    price: 49,
    sold: "11.4k",
    image: "https://example.com/lightstick.jpg", // Replace with actual image URL if available
    type: ["Small", "Large"],
    color: ["Pink", "Purple"],
  };

  useEffect(() => {
    // Simulate fetching product data by ID
    const fetchProduct = async () => {
      setProduct(mockProduct);
      if (mockProduct.type && mockProduct.type.length > 0) setType(mockProduct.type[0]);
      if (mockProduct.color && mockProduct.color.length > 0) setColor(mockProduct.color[0]);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Item added to cart:", { id: product.id, type, color, quantity });
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
   <Box>
    <Box sx={{display: "flex", direction: "column"}}>
      <Box sx={{width: "50%", height: "50 vw"}}>

      </Box>
    </Box>
    <Box sx={{backgroundColor: "blue", with: "100%", height: "10vw"}}>

    </Box>
   </Box>
  );
};

export default MerchandiseDetail;
