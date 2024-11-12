import MerchandiseCard from "../components/common/MerchandiseCard";
import Grid from "@mui/material/Grid2";

const ArtistManageMerchandise = () => {
  return (
    <Grid container spacing={2}>
      <MerchandiseCard />
      <MerchandiseCard />
      <MerchandiseCard />
      <MerchandiseCard />
      <MerchandiseCard />
    </Grid>
  );
};

export default ArtistManageMerchandise;
