import Grid from "@mui/material/Grid2";
import MerchandiseCard from "./MerchandiseCard";

const CardGrid = ({ List, Type = "album" }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      columns={{ md: 4, xs: 2 }}
    >
      {List.map((child, index) => (
        <Grid key={index} size={1}>
          <MerchandiseCard merchandise={child} hoverEffect={"scale"} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
