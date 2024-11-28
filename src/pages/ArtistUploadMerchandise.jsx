import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";

const AddMerchandiseForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "Physical Album",
    description: "",
    price: "",
    quantityInStock: "",
    relatedAlbum: "",
    productImage: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData); // Log form data on submit
  };

  return (
    <Container maxWidth="xl" sx={{minWidth: "20em"}}>
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Add New Merchandise
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Merchandise Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      name="category"
                      label="Category"
                      onChange={handleChange}
                    >
                      {/* TODO: loads all categories */}
                      <MenuItem value="Physical Album">Physical Album</MenuItem>
                      <MenuItem value="Digital Album">Digital Album</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: "$",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity In Stock"
                    name="quantityInStock"
                    type="number"
                    value={formData.quantityInStock}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Related Album</InputLabel>
                    <Select
                      value={formData.relatedAlbum}
                      name="relatedAlbum"
                      label="Related Album"
                      onChange={handleChange}
                    >
                      {/* TODO: loads all artist's album */}
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="album1">Album 1</MenuItem>
                      <MenuItem value="album2">Album 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ height: 56 }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ flex: 1 }}
                    >
                      PUBLISH
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ flex: 1 }}>
                      DISCARD
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Preview
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              This is how your product looks on Artist Shop.
            </Typography>

            <Card sx={{ maxWidth: 400, margin: "0 auto" }}>
              <CardMedia
                sx={{ height: 320, backgroundColor: "gray" }}
                // image={formData.productImage || grayBg}
                title="Product Preview"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {formData.productName || "Merchandise Name"}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${formData.price || "0"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity in Stock: {formData.quantityInStock || "0"}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {formData.description ||
                    "Product description will appear here..."}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button variant="outlined" fullWidth>
                    Add to Cart
                  </Button>
                  <Button variant="contained" fullWidth>
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddMerchandiseForm;
