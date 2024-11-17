import { Grid2 } from "@mui/material";
import MerchandiseCard from "./MerchandiseCard";

const CardGrid = ({ List, Type = "album" }) => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {List.map((child, index) => (
        <Grid2 xs={4} sm={3} md={2} key={index}>
          <MerchandiseCard merchandise={child} hoverEffect={"scale"} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CardGrid;
