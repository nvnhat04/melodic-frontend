import React, { useEffect, useState } from "react";
import DenseTable from "../components/common/DenseTable";
import ArtistApi from "../api/modules/artist.api";
import { useSelector } from "react-redux";

const ArtistManageTracks = () => {
  const artist_id = useSelector((state) => state.auth.user_id);

  const header = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "album_title", label: "Album" },
    { id: "created_at", label: "Created At" },
    { id: "streams", label: "Streams" },
  ];

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchArtistTracks = async () => {
      try {
        const data = await ArtistApi.getAllTracks(artist_id);
        console.log(data);
        const filteredData = data.map((track) => ({
          id: track.track_id,
          title: track.track_title,
          album_title: track.album_title,
          created_at: new Date(track.created_at).toISOString().split("T")[0],
          streams: track.streams,
        }));
        console.log("filered: ", filteredData);
        setTracks(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtistTracks();
  }, []);

  return (
    <div>
      <h1>Artist Tracks</h1>
      <DenseTable header={header} rows={tracks} />
    </div>
  );
};

export default ArtistManageTracks;
