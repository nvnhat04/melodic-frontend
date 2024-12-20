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
import MerchandiseCardPreview from "../components/common/MerchandiseCardPreview";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import ArtistApi from "../api/modules/artist.api";
import MerchandiseApi from "../api/modules/merchandise.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArtistAddNewMerchandise = () => {
  const artist_id = useSelector((state) => state.auth.user_id);
  const token = useSelector((state) => state.auth.token);

  const placeholderImage = "/default/merchandise_cover.jpg";
  
  const initialMerchandise = {
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    album_id: "",
  };
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [fileError, setFileError] = useState("");
  const [merchandise, setMerchandise] = useState(initialMerchandise);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchArtistAlbums = async () => {
      try {
        const response = await ArtistApi.getAllAlbums(artist_id);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", merchandise.name);
    formData.append("category", merchandise.category);
    formData.append("price", merchandise.price);
    formData.append("stock", merchandise.stock);
    formData.append("description", merchandise.description);
    formData.append("album_id", merchandise.album_id);
    formData.append("artist_id", artist_id);
    if (image) formData.append("image", image);

    try {
      const response = await MerchandiseApi.createMerchandise(formData, token);
      setMerchandise(initialMerchandise);
      setImage(null);

      // Success toast
      toast.success("Merchandise created successfully!");
    } catch (error) {
      console.error("Failed to create merchandise:", error);
      // Error toast
      toast.error("Failed to create merchandise. Please try again later.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setImage(file);
      setFileError("");
    } else {
      setImage(null);
      setFileError("Please upload a valid image file (JPEG, PNG, JPG).");
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
                <MenuItem value="apparel">Apparel</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="physical album">Physical Album</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl fullWidth required>
              <FormLabel>Related Album</FormLabel>
              <Select
                id="album_id"
                name="album_id"
                onChange={handleChange}
                value={merchandise.album_id ?? ""}
              >
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
                value={merchandise.price}
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 1 }}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel>Quantity In Stock</FormLabel>
              <OutlinedInput
                name="stock"
                type="number"
                value={merchandise.stock}
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
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  hidden
                />
                Upload image
              </Button>
            </FormControl>
            {fileError && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {fileError}
              </Typography>
            )}
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
          <MerchandiseCardPreview
            merchandise={{
              name: merchandise.name,
              category: merchandise.category,
              price: merchandise.price,
              stock: merchandise.stock,
              description: merchandise.description,
              album_id: merchandise.album_id,
              image: image ? URL.createObjectURL(image) : placeholderImage,
            }}
          />
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ArtistAddNewMerchandise;
