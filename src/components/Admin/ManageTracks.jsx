import Management from "./Management";
import trackApi from "../../api/modules/track.api";
import { useState , useEffect} from "react";
const tracks = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "artists", label: "Artist" },
    {id: "album", label: "Album Title"},
    {id: 'language', label: 'Language'},
    {id: 'genres', label: 'Genres'},
    {id: "track_url", label: "Track URL"},
  ];
function ManageTracks() {

  return   <Management delete={trackApi.deleteTrackById} getAllData={trackApi.getAllTracks} columns={tracks}/>
}

export default ManageTracks;
