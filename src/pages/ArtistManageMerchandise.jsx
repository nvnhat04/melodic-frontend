import React, { useState, useEffect } from "react";
import MerchandiseCard from "../components/common/MerchandiseCard";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MerchandiseApi from "../api/modules/merchandise.api";
import { useSelector } from "react-redux";

const ArtistManageMerchandise = () => {
  const user_id = useSelector((state) => state.auth.user_id);

  const [merchandiseList, setMerchandiseList] = useState([]);

  const [sort, setSort] = React.useState("newest");
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    const fetchMerchandiseList = async () => {
      try {
        const response = await MerchandiseApi.getAllMerchandiseByArtistId(
          user_id,
          sort
        );
        setMerchandiseList(response);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      }
    };
    fetchMerchandiseList();
  }, [user_id]);

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Merchandise
      </Typography>
      <Box
        display={{ xs: "none", sm: "none", md: "flex" }}
        justifyContent="end"
        alignItems="center"
        gap={2}
      >
        {/* Filters */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1">Filters</Typography>
          <IconButton aria-label="filter options">
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* Sort By */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1">Sort By:</Typography>
          <Select
            value={sort}
            onChange={handleSortChange}
            size="small"
            variant="standard"
            sx={{ marginLeft: 1, minWidth: 120 }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Sales Ascending</MenuItem>
            <MenuItem value="newest">Sales Descending</MenuItem>
          </Select>
        </Box>
      </Box>
      <Grid
        container
        spacing={{ sm: 1, md: 2 }}
        columns={{ sm: 1, md: 2, lg: 4 }}
        p={2}
      >
        {merchandiseList.map((item) => (
          <Grid key={item.id} size={1}>
            <MerchandiseCard merchandise={item} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} alignSelf="center">
        <Pagination count={10} />
      </Stack>
    </Box>
  );
};

export default ArtistManageMerchandise;
