import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TopBar from "../components/common/Topbar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarRateIcon from "@mui/icons-material/StarRate";
const MerchandiseDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [type, setType] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 20;
  const [count, setCount] = useState(1);
  const [artist, setArtist] = useState(null);
  const [albumImg, setAlbumImg] = useState(null);

  // Mock product data (This should be replaced by actual data fetched from the database)
  const mockProduct = {
    id: 1,
    name: "RUNNING HOUSE T-SHIRT",
    artist_id: 101,
    stock: 250,
    album_id: 202,
    price: 49,
    description:
      "A stylish, high-quality polo shirt suitable for both men and women. Made with premium fabric and designed with an oversize fit.",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/ROADTORUINCREWNECKMOCK_600x.png?v=1634018353",
    sold: "11.4k",
    rating: 4.5,
    created_at: "2024-01-15T10:00:00Z",
  };

  const mockArtist = {
    name: "Jack",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D6I_OM3e_cbZ5zhovzOMAm8BZxlsxxVsw&s ",
  };

  const mockAlbum = {
    img: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdUlAVv8BhOstJLt47s3uceLIQQg-E2JDVg&s",
  };

  useEffect(() => {
    // Simulate fetching product data by ID
    const fetchProduct = async () => {
      setProduct(mockProduct);
      if (mockProduct.type && mockProduct.type.length > 0)
        setType(mockProduct.type[0]);
      if (mockProduct.color && mockProduct.color.length > 0)
        setColor(mockProduct.color[0]);
    };
    setAlbumImg(mockAlbum.img);
    setArtist(mockArtist);
    fetchProduct();
  }, [id]);

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Hàm xử lý tăng giá trị
  const increase = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
    console.log("Item added to cart:", {
      id: product.id,
      type,
      color,
      quantity,
    });
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };
  const handleShop = () => {
    navigate("/shop");
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          width: "90%",
          margin: "1% 5%",
          alignItems: "stretch",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: "45%",
            height: "50vw",
            backgroundColor: "#white",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              marginTop: "1.3vw",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              width: "60vw",
              height: "35vw",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "60%",
            backgroundColor: "#white",
            color: "#black",
            padding: "1em",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.75vw",
              fontWeight: "bold",
              marginBottom: "0.5em",
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ color: "black" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1em",
                marginLeft: "2vw",
              }}
            >
              <Typography
                sx={{ color: "black", fontSize: "3vw", fontWeight: "bold" }}
              >
                ${product.price}
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "1.2vw" }}>
                Sold: {product.sold}
              </Typography>
              <Typography
                sx={{
                  color: "#ffb71f",
                  fontSize: "1.2vw",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StarRateIcon
                  sx={{ marginRight: "0.5vw", width: "2vw", height: "2vw" }}
                />{" "}
                {product.rating} / 5
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "2vw", marginTop: "1.5vw", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: "1.5vw",
                  color: "gray",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                }}
              >
                {product.description}
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "2vw", marginTop: "8vw", display: "flex" }}>
              <Typography sx={{ fontSize: "1.5vw", fontWeight: "Bold" }}>
                Related Album:
              </Typography>
              <Link
                to="/shop"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                <img
                  src={albumImg}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginLeft: "2vw",
                    marginTop: "-1vw",
                    marginBottom: "0.5vw",
                    width: "5vw",
                    height: "5vw",
                    border: "0.1vw gray solid",
                  }}
                />
              </Link>
            </Box>
            <Box
              sx={{
                marginTop: "2vw",
                marginLeft: "2vw",
                display: "flex",
                height: "3vw",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.5vw",
                  fontWeight: "Bold",
                }}
              >
                Quantity:
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                marginLeft="2vw"
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
                    onClick={decrease}
                    disabled={count < 1}
                    disableRipple
                    sx={{
                      fontSize: "2vw",
                      width: "1.5vw",
                      height: "1.5vw",
                      minWidth: "0",
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
                      {" "}
                      -{" "}
                    </Typography>
                  </Button>
                </Box>
                <Typography sx={{ fontSize: "1vw", fontWeight: "bold", width: "4vw", textAlign: "center" }}>
                  {count}
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
                    onClick={increase}
                    sx={{
                      fontSize: "2vw",
                      width: "1.5vw",
                      height: "1.5vw",
                      minWidth: "0",
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2vw",
                marginLeft: "2vw",
                width: "28vw",
              }}
            >
              <Button
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "#e6d8d9",
                  minWidth: "0",
                  color: "#d0011b",
                  fontSize: "0.9vw",
                  width: "13vw",
                  height: "4vw",
                  border: "0.1vw #d0011b solid",
                  "&:hover": {
                    backgroundColor: "rgba(230,216,217, 0.9)",
                  },
                }}
              >
                <AddShoppingCartIcon
                  sx={{
                    marginRight: "0.75vw",
                    width: "1.5vw",
                    height: "1.5vw",
                  }}
                />
                <Typography sx={{ fontWeight: "bold", fontSize: "1vw" }}>
                  {" "}
                  ADD TO CART
                </Typography>
              </Button>
              <Button
                onClick={handleBuyNow}
                sx={{
                  backgroundColor: "#d0011b",
                  minWidth: "0",
                  color: "white",
                  fontSize: "0.9vw",
                  width: "13vw",
                  height: "4vw",
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "1vw" }}>
                  {" "}
                  BUY NOW{" "}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          width: "90%",
          margin: "2% 5% -1% 5%",
          display: "flex",
        }}
      >
        <Link
          to="/shop"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          <img
            src={artist.img}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              border: "0.1vw gray solid",
              width: "7vw",
              height: "7vw",
              marginLeft: "2vw",
              marginTop: "2vw",
            }}
          />
        </Link>
        <Box sx={{ margin: "2vw", color: "black" }}>
          <Typography sx={{ fontSize: "2vw" }}>
            {artist.name}'s Store
          </Typography>
          <Button
            disableRipple
            sx={{
              width: "12vw",
              minWidth: "0",
              height: "2.5vw",
              border: "0.12vw gray solid",
              marginTop: "2vw",
              fontSize: "0.75vw",
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
            onClick={handleShop}
          >
            <RemoveRedEyeIcon
              sx={{
                marginRight: "0.75vw",
                width: "1.5vw",
                height: "1.5vw",
                color: "black",
              }}
            />{" "}
            <Typography
              sx={{ fontWeight: "medium", fontSize: "1vw", color: "black" }}
            >
              {" "}
              VIEW SHOP{" "}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MerchandiseDetail;
