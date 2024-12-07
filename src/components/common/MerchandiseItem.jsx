import { Paper, Typography, Box } from "@mui/material";

const MerchandiseItem = ({ merchandise }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: "0.5rem",
        backgroundColor: "lightgray",
        display: "flex",
        borderRadius: "0",
        borderBottom: "1px solid #ffffff",
        alignItems: "center",
      }}
    >
      <Typography fontWeight="bold" flexBasis="40rem">
        {merchandise.name}
      </Typography>
      <Box display="flex" flexGrow={1} textAlign="center">
        <Typography width="5rem">${merchandise.price}</Typography>
        <Typography width="5rem">{merchandise.stock}</Typography>
        <Typography width="5rem">{merchandise.total_sold}</Typography>
      </Box>
    </Paper>
  );
};

export default MerchandiseItem;
