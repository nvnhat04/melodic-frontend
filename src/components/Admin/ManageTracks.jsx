import Management from "./Management";
import trackApi from "../../api/modules/track.api";
import { useState , useEffect} from "react";
const tracks = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "artist", label: "Artist" },
    { id: "image", label: "Image" },
  ];
function ManageTracks() {

  return   <Management delete={trackApi.deleteTrackById} getAllData={trackApi.getAllTracks} columns={tracks}/>
}

export default ManageTracks;
