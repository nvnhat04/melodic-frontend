import { createTheme, ThemeProvider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
          width: "80%",
          textAlign: "center",
          fontSize: "1em",
          padding: 2,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover img": {
            opacity: 0.7,
          },
          border: "none",
          boxShadow: "none",
        }}
      >
        <Box
          component="img"
          src={merchandise.image}
          alt={merchandise.name}
          sx={{
            width: "100%",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
        <Typography
          sx={{
            fontSize: "1em",
            fontWeight: "600",
            lineHeight: "1.4",
          }}
        >
          {merchandise.name}
        </Typography>
        <Typography
          mt={1}
          sx={{ fontSize: "0.8em", fontWeight: "600", color: "#1a1a1a" }}
        >
          ${merchandise.price}
        </Typography>
      </Paper>
    </ThemeProvider>
  );
};

export default MerchandiseCard;
