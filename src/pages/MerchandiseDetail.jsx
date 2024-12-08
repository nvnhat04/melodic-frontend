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
    const orderData = {
      selectedProducts: [{ ...product, quantity: count }],
      total: count * product.price
    };
    navigate("/shop/checkout", { state: orderData });
  };
  const handleShop = () => {
    navigate("/shop");
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5",paddingBottom: "5vh", }}>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          margin: "1% 5%",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          alignItems: { md: "stretch", sm: "center", xs: "center" },
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: {
              md: "45%",
              xs: "100%",
            },
            height: {
              md: "50vw",
              xs: "100vw",
            },
            backgroundColor: "white",
            display: "flex",
            alignItems: {
              md: "flex-start",
              xs: "center",
            },
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              marginTop: "1.3vw",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              width: { md: "60vw", sm: "80vw", xs: "90vw" },
              height: {
                md: "35vw",
                sm: "60vw",
                xs: "70vw",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            width: {
              md: "60%",
              xs: "100%",
            },
            backgroundColor: "#white",
            color: "black",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                md: "1.75vw",
                sm: "4vw",
                xs: "5vw",
              },

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
                justifyContent: "flex-start",

                gap: "1em",
                marginLeft: "2vw",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: {
                    md: "3vw",
                    xs: "5vw",
                  },
                  fontWeight: "bold",
                }}
              >
                ${product.price}
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: {
                    md: "1.2vw",
                    xs: "3vw",
                  },
                }}
              >
                Sold: {product.sold}
              </Typography>
              <Typography
                sx={{
                  color: "#ffb71f",
                  fontSize: {
                    md: "1.2vw",
                    xs: "3vw",
                  },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StarRateIcon
                  sx={{
                    marginRight: "0.5vw",
                    width: { md: "2vw", xs: "4vw" },
                    height: { md: "2vw", xs: "4vw" },
                  }}
                />{" "}
                {product.rating} / 5
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "2vw", marginTop: "1.5vw", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: { md: "1.5vw", xs: "3vw" },
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
            <Box
              sx={{
                marginLeft: "2vw",
                marginTop: "8vw",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: "1.5vw", xs: "3vw" },
                  fontWeight: "Bold",
                }}
              >
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
                <Box
                  component="img"
                  src={albumImg}
                  alt={product.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginLeft: "2vw",
                    width: { md: "5vw", xs: " 10vw" },
                    height: { md: "5vw", xs: "10vw" },
                    border: "0.1vw gray solid",
                  }}
                />
              </Link>
            </Box>
            <Box
              sx={{
                marginTop: { md: "3vw", xs: "6vw" },
                marginBottom: "4vw",
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
                  fontSize: { md: "1.5vw", xs: "3vw" },
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
                sx={{
                  width: { md: "10vw", xs: "20vw" },
                  height: { md: "2vw", xs: "4vw" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "30%",
                    borderRight: "0.1vw gray solid",
                  }}
                >
                  <IconButton
                    disableRipple
                    onClick={decrease}
                    sx={{
                      "& :hover": {
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
                    <RemoveIcon
                      sx={{
                        width: {
                          xs: "20px",
                          sm: "23px",
                          md: "20px",
                          lg: "25px",
                          xl: "30px",
                        },
                        height: {
                          xs: "20px",
                          sm: "23px",
                          md: "20px",
                          lg: "25px",
                          xl: "30px",
                        },
                      }}
                    ></RemoveIcon>
                  </IconButton>
                </Box>

                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: {
                      md: "1.25vw",
                      xs: "2.5vw",
                    },
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  {count}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "30%",
                    borderLeft: "0.1vw gray solid",
                  }}
                >
                  <IconButton
                    disableRipple
                    onClick={increase}
                    sx={{
                      "& :hover": {
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
                    <AddIcon
                      sx={{
                        width: {
                          xs: "20px",
                          sm: "23px",
                          md: "20px",
                          lg: "25px",
                          xl: "30px",
                        },
                        height: {
                          xs: "20px",
                          sm: "23px",
                          md: "20px",
                          lg: "25px",
                          xl: "30px",
                        },
                      }}
                    ></AddIcon>
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: {
                  md: "0",
                  xs: "8vw"
                },
                display: "flex",
                alignItems: "center",
                flexDirection: {
                  md: "row",
                  xs: "column",
                },
                width: {
                  md: "28vw",
                  xs: "100%",
                },
              }}
            >
              <Button
                onClick={handleAddToCart}
                sx={{
                  margin: "2vw",
                  padding: {
                    md: "0",
                    sm: "3vw",
                    xs: "4vw"
                  },
                  backgroundColor: "#e6d8d9",
                  minWidth: "0",
                  color: "#d0011b",
                  fontSize: "0.9vw",
                  width: {
                    md: "13vw",
                    xs: "90%",
                  },
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
                    width: {
                      md: "1.5vw",
                      xs: "3vw",
                    },
                    height: {
                      md: "1.5vw",
                      xs: "3vw",
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      md: "1vw",
                      xs: "2vw",
                    },
                  }}
                >
                  {" "}
                  ADD TO CART
                </Typography>
              </Button>
              <Button
                onClick={handleBuyNow}
                sx={{
                  backgroundColor: "#d0011b",
                  padding: {
                    md: "0",
                    sm: "3vw",
                    xs: "4vw",
                  },
                  width: {
                    md: "13vw",
                    xs: "90%",
                  },
                  minWidth: "0",
                  color: "white",
                  fontSize: "0.9vw",
                  height: "4vw",
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      md: "1vw",
                      xs: "2vw",
                    },
                  }}
                >
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
          paddingBottom:{xs: "5%"},
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
          <Box
             component="img"
            src={artist.img}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              border: "0.1vw gray solid",
              width: {
                md: "7vw",
                xs: "13vw"
              },
              height: {
                md: "7vw",
                xs: "13vw"
              },
              marginLeft: "2vw",
              marginTop: "2vw",
            }}
          />
        </Link>
        <Box sx={{ margin: "2vw 2vw 0vw 2vw", color: "black" }}>
          <Typography sx={{ fontSize: {
            md: "2vw",
            sm: "3vw",
            xs: "4vw"
          } }}>
            {artist.name}'s Store
          </Typography>
          <Button
            disableRipple
            sx={{
              width: {
                md: "12vw",
                sm: "16vw",
                xs: "20vw"
              },
              minWidth: "0",
              height: {
                md: "2.5vw",
                xs: "5vw"
              },
              border: "0.12vw gray solid",
              marginTop: "2vw",
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
                width: {
                  md:"1.5vw",
                  xs:"3vw"
                },
                height: {
                  md: "1.5vw",
                  xs: "3vw"
                },
                color: "black",
              }}
            />{" "}
            <Typography
              sx={{ fontWeight: "medium", fontSize: {
                md: "1vw",
                sm: "1.5vw",
                xs: "2vw"
              }, color: "black" }}
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
