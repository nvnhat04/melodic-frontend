import React, { useEffect, useState } from "react";
import MerchandiseSlider from "../components/common/Slider";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import Container from "../components/common/Container";
import TopBar from "../components/common/Topbar";

const mockProducts = [
  {
    id: 1,
    name: "BTS Official Light Stick",
    image:
      "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
  },
  {
    id: 2,
    name: "Album ABC",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
  },
  {
    id: 3,
    name: "Album XYZ",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
  },
  {
    id: 4,
    name: "BTS Official Light Stick",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/ROADTORUINCREWNECKMOCK_600x.png?v=1634018353",
  },
  {
    id: 5,
    name: "Album ABC",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODTEEFRONT_600x.png?v=1634018500",
  },
  {
    id: 6,
    name: "Album XYZ",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
  },
  {
    id: 7,
    name: "BTS Official Light Stick",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/ROADTORUINCREWNECKMOCK_600x.png?v=1634018353",
  },
  {
    id: 8,
    name: "Album ABC",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODTEEFRONT_600x.png?v=1634018500",
  },
  {
    id: 9,
    name: "Album XYZ",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
  },
  // Add more products as needed
];

function ShopPage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [btsStore, setBtsStore] = useState([]);

  useEffect(() => {
    setNewArrivals(mockProducts);
    setTrendingNow(mockProducts);
    setBtsStore(mockProducts);
  }, []);
  return (
    <Stack
      spacing={7}
      sx={{ width: "90vw", margin: "2rem auto", color: "#fff" }}
    >
      {newArrivals.length > 0 && (
        <Container color="black" header="New Arrivals">
          <MerchandiseSlider list={newArrivals} type={"merchandise"} />
        </Container>
      )}
      {trendingNow.length > 0 && (
        <Container color="black" header="Trending Now">
          <MerchandiseSlider list={trendingNow} type={"merchandise"} />
        </Container>
      )}
      {btsStore.length > 0 && (
        <Container color="black" header="BTS'store">
          <MerchandiseSlider list={btsStore} type={"merchandise"} />
        </Container>
      )}
    </Stack>
  );
}

export default ShopPage;
