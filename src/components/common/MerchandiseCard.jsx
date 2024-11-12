import { createTheme, ThemeProvider } from "@mui/material";
import Paper from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const merchandise = {
  name: `‘I LOVE YOU.’ 10th ANNIVERSARY EDITION 2xLP + ‘THE LOVE COLLECTION’ 7”`,
  category: "Physical Album",
  price: "25",
  image:
    "https://shop.thenbhd.com/cdn/shop/products/TheNBHD_ILoveYouD2C_1024x1024@2x.png?v=1681914792",
};

const theme = createTheme({
  typography: {
    fontFamily: ["Neue Helvetica Condensed BQ", "san-serif"].join(","),
  },
});

const MerchandiseCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "20%",
          minWidth: "10em",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <img
          src={merchandise.image}
          alt={merchandise.name}
          width="100%"
          style={{ objectFit: "cover", aspectRatio: "1/1" }}
        />
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "600",
            lineHeight: "1.4",
          }}
        >
          {merchandise.name}
        </Typography>
        <Typography
          sx={{ fontSize: ".9rem", fontWeight: "600", color: "#1a1a1a" }}
        >
          ${merchandise.price}
        </Typography>
      </Paper>
    </ThemeProvider>
  );
};

export default MerchandiseCard;
