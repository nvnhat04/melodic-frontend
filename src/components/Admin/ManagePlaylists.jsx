import Management from "./Management";
import playlistApi from "../../api/modules/playlist.api";
import { useState , useEffect} from "react";
const playlists = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "cover", label: "Image" },
    { id: "date_created", label: "Date Created" },
    {id: "date_modified", label: "Date Modified"},
    {id:"is_public", label: "Is Public"},
    {id: "creator_id", label: "Creator ID"},
];
function ManagePlaylists() {
  return    <Management delete={playlistApi.deletePlaylist} getAllData={playlistApi.getAllPlaylists}  columns={playlists}/>
}

export default ManagePlaylists;
