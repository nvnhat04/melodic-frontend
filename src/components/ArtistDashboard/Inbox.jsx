import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CollaborationRequestCard from "./CollaborationRequestCard";
import artistApi from "../../api/modules/artist.api";
import { useSelector } from "react-redux";
function Inbox() {
    const user_id = useSelector((state) => state.auth.user_id);
    const [requests, setRequests] = useState([]);
    const handleApprove = (trackId) => {
        const data = {
            trackId: trackId,
            artistId: user_id,
        }
        artistApi.approveCollaboration(data).then((res) => {
            // console.log("API Response:", res);
            if (res) {
                fetchRequests();
            }
        });
    }
    const handleReject = (trackId) => {
        const data = {
            trackId: trackId,
            artistId: user_id,
        }
        artistApi.rejectCollaboration(data).then((res) => {
            // console.log("API Response:", res);
            if (res) {
                fetchRequests();
            }
        });
    }
    const fetchRequests = () => {
        artistApi.getRequestedTracks(user_id).then((res) => {
            if (res) {
                setRequests(res);
                // console.log("Requests data found:", requests);

            }
        });
    };

    useEffect(() => {
        fetchRequests();
    }, [user_id]);
    // useEffect(() => {
    //     console.log("Requests data found:", requests);
    // }, [requests]);
  return (
   <Box>
        {requests.map((request) => (
                <CollaborationRequestCard
                    request={request}   
                    onAccept={() => handleApprove(request.track_id)}
                    onDecline={() => handleReject(request.track_id)}
                />
            // : <CollaborationRequestCard
            //     request={request}
            //     // onAccept={() => handleApprove(request.track_id)}
            //     // onDecline={() => handleReject(request.track_id)}
            // />
        ))}
   </Box>
  );
}
export default Inbox;