import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import createUrl from "../../hooks/createUrl";
const CollaborationRequestCard = ({request, onAccept, onDecline} ) => {
  if (!request) {
    return null;
  }
  // console.log("Request data found red:", request);
  return (
    <Paper
      elevation={2}
      sx={{ display: "flex", gap: "1rem", borderRadius: "0.5rem", margin: "1rem" }}
    >
      <Box component="img" width="5em" height="5em" src={createUrl(request.cover)}></Box>
      <Box
        p={1}
        display="flex"
        justifyContent="space-around"
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{request.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            requested by {request.original_artist_name} with contribution of {request.contribution}%
          </Typography>
        </CardContent>
        <Box display="flex" gap="1rem" sx={{ alignItems: "center", marginRight: "10px" }}>
          {request.status === "pending" && (
            <CardActions>
              <Button
                variant="contained"
                // color="success"
                onClick={onAccept}
                sx={{ marginRight: 1 }}
              >
                YES
              </Button>
              <Button variant="contained"  onClick={onDecline}>
                NO
              </Button>
            </CardActions>
          )}
          {request.status === "approved" && (
            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
              Approved
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CollaborationRequestCard;
