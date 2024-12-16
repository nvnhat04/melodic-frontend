import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MerchandiseCard from "../components/common/MerchandiseCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import ArtistApi from "../api/modules/artist.api";
import MerchandiseApi from "../api/modules/merchandise.api";

const ArtistAddNewMerchandise = () => {
  const user_id = useSelector((state) => state.auth.user_id);

  const [artistAlbums, setArtistAlbums] = useState([]);
  const [merchandise, setMerchandise] = useState({
    name: "",
    category: "",
    price: "",
    quantityInStock: "",
    description: "",
    image:
      "https://shop.thenbhd.com/cdn/shop/files/NEI-MOON-TEE_1024x1024@2x.png?v=1731339647",
    relatedAlbum: "",
  });

  useEffect(() => {
    const fetchArtistAlbums = async () => {
      try {
        const response = await ArtistApi.getAllAlbums(user_id);
        console.log("Fetched Artist Albums:", response);

        setArtistAlbums(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtistAlbums();
  }, []);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMerchandise((values) => ({ ...values, [name]: value }));
  };

// <<<<<<< main
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // TODO: Add API call to add new merchandise
//     console.log(merchandise);
// =======
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await MerchandiseApi.createMerchandise({
        name: merchandise.name,
        artist_id: user_id,
        album_id: merchandise.relatedAlbum,
        category: merchandise.category,
        price: merchandise.price,
        stock: merchandise.quantityInStock,
        description: merchandise.description,
        image: merchandise.image,
      });
      console.log("Merchandise created:", response);

      setMerchandise({
        name: "",
        category: "",
        price: "",
        quantityInStock: "",
        description: "",
        image: "",
        relatedAlbum: "",
      });
    } catch (error) {
      console.error("Failed to create merchandise:", error);
    }

  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Add new merchandise
      </Typography>
      <Box display="flex" flexflow="row wrap">
        <Grid
          component="form"
          onSubmit={handleSubmit}
          flex="1 1 50%"
          container
          columns={2}
          p={2}
          columnSpacing={2}
          rowSpacing={1}
          mr={5}
          sx={{ "& .MuiFormLabel-root": { color: "black" } }}
        >
          {/* {Merchandise Form} */}
          <Grid size={2}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel component="h2" variant="h2">
                Merchandise Name
              </FormLabel>
              <OutlinedInput
                name="name"
                value={merchandise.name}
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl fullWidth required>
              <FormLabel>Category</FormLabel>
              <Select
                id="category"
                name="category"
                onChange={handleChange}
                value={merchandise.category ?? ""}
              >

//                 <MenuItem value="Digital Album">Digital Album</MenuItem>
//                 <MenuItem value="Physical Album">Physical Album</MenuItem>

                <MenuItem value="apparel">Apparel</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="Physical Album">Physical Album</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl fullWidth required>
              <FormLabel>Related Album</FormLabel>
              <Select
                id="relatedAlbum"
                name="relatedAlbum"
                onChange={handleChange}
                value={merchandise.relatedAlbum ?? ""}
              >

//                 <MenuItem value="Chip Chrome">Chip Chrome</MenuItem>
//                 <MenuItem value="Sweater Weather">Sweater Weather</MenuItem>

                {artistAlbums.map((album) => (
                  <MenuItem key={album.id} value={album.id}>
                    {album.title}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 1 }}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel>Price</FormLabel>
              <OutlinedInput
                name="price"
                type="number"
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 1 }}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel>Quantity In Stock</FormLabel>
              <OutlinedInput
                name="quantityInStock"
                type="number"
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl variant="filled" fullWidth>
              <FormLabel>Description</FormLabel>
              <OutlinedInput
                value={merchandise.description ?? ""}
                name="description"
                multiline
                minRows={4}
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl variant="filled" fullWidth>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ backgroundColor: "#564c4d" }}
              >
                Upload image
              </Button>
            </FormControl>
          </Grid>
          <Grid size={2} variant="filled">
            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              gap={2}
            >
              <FormControl fullWidth>
                <Button type="submit" variant="contained">
                  Publish
                </Button>
              </FormControl>
              <FormControl fullWidth>
                <Button type="reset" variant="outlined">
                  Cancel
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Box
          flex="1 1 50%"
          display={{ xs: "none", sm: "none", md: "flex" }}
          alignItems="center"
          flexDirection="column"
          p={4}
        >
          {/* {Preview} */}
          <Typography variant="h4" component="h2" alignSelf="start">
            Preview
          </Typography>
          <Typography component="p" alignSelf="start">
            This is how your merchandise appears in Artist Shop.
          </Typography>
          <MerchandiseCard merchandise={merchandise} />
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistAddNewMerchandise;
