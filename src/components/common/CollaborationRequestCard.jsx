import * as React from "react";
import { Avatar, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const CollaborationRequestCard = ({ title, cover, artist, daysAgo, onAccept, onDecline }) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "8px",
      margin: "8px 0",
    }}
  >
    <Avatar src={cover} sx={{ width: "5em", height: "auto", marginRight: 2 }} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="textSecondary">
        requested {daysAgo} days ago by {artist}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        variant="contained"
        color="success"
        onClick={onAccept}
        sx={{ marginRight: 1 }}
      >
        YES
      </Button>
      <Button variant="contained" color="error" onClick={onDecline}>
        NO
      </Button>
    </CardActions>
  </Card>
);

export default CollaborationRequestCard;