import React, { useState, useRef, useEffect } from "react";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeDown,
  MdVolumeUp,
  MdZoomOut,
  MdZoomOutMap,
  MdLibraryMusic,
  MdLibraryAdd,
  MdLoop,
  MdShuffle,
  MdVolumeMute,
  MdQueueMusic,
  MdReplay,
} from "react-icons/md";


import { Box, Slider} from "@mui/material";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import PlayScreen from "../../../pages/PlayScreen";
import useAudioPlayer from "../../../hooks/useAudioPlayer";
import trackApi from "../../../api/modules/track.api";
import createUrl from "../../../hooks/createUrl";
import { useSelector } from "react-redux";

const queueSong01= [
      {
        "id": "MTVkYThlMmEtZDA5NC00NTkyLWFlMmItNDcxNDBmYTY3Yjhm",
        "title": "Tim Anh Ghen",
        "lyrics": "Bởi vì nguyên team anh geng geng\r\nBởi vì nguyên team anh geng geng\r\nBọn anh on the same lane, xuyên qua màn đêm đen, follow game plan\r\nIce chain leng keng, đồng hồ trên tay anh trông như ben10",
        "release_date": "2024-10-30T17:00:00.000Z",
        "duration": 279,
        "language": "Vietnamese",
        "track_url": "1UnYyuloL-3UT-6zs5jAGqMG0dxDY5DtI",
        "genres": null,
        "artists": [
            "nhat nguyen"
        ]
    }
]
const queueSong02= [
  {
    "id": "",
    "title": "",
    "lyrics": "",
    "release_date": "",
    "duration": null,
    "language": "",
    "track_url": null,
    "genres": null,
    "artists": [
        
    ]
}
]

// const queueId = [
//   "MTVkYThlMmEtZDA5NC00NTkyLWFlMmItNDcxNDBmYTY3Yjhm",
//   "MzY3M2IxOTAtYTYzNS00ZmE2LTgxZjYtNjM2NmRmZjgzNTFh",
//   "M2Q1YWJjNTctYmVmZC00MGJiLTk1NGMtNWQ5YjBkNTZiMDM3",
//   "YTliMjM4OTItOThjZi00Y2Q0LTkxYjMtZTViZTRkZjEwYTY1"
// ];
function MusicPlayer() {

  const [isPlayScreenOpen, setIsPlayScreenOpen] = useState(false);
  const [queueSong, setQueueSong] = useState(queueSong02);
  const url = createUrl(queueSong02[0].track_url);
  const [srcTrack, setSrcTrack] = useState(url);
  const queueId = useSelector((state) => state.queueSongs.queueSongs);
  const trackCache = useRef({});
  useEffect(() => {
    if (queueId.length === 0) {
      console.warn('queueId is empty');
      return;
    }
    console.log("QueueID:", queueId);
    let queueSongPlays = [];
    let promises = [];
  
    for (let trackId = 0; trackId < queueId.length; trackId++) {
      const id = queueId[trackId];
      if (trackCache.current[id]) {
        promises.push(Promise.resolve(trackCache.current[id]));
      } else {
        const promise = trackApi.getTrackById(id).then((result) => {
          trackCache.current[id] = result;
          return result;
        });
        promises.push(promise);
      }
    }
  
    Promise.all(promises)
      .then((results) => {
        // Handle results
        console.log('Results:', results);
        setQueueSong(results);
      })
      .catch((error) => {
        console.error('Error fetching tracks:', error);
      });
  }, [queueId]);


  const audioPlayerProps = useAudioPlayer(queueSong);
  useEffect(() => {
    if (queueSong.length > 0) {
      audioPlayerProps.setCurrentSongIndex(queueSong.length - 1); // Set the current song index to the last track
      const lastTrack = queueSong[queueSong.length - 1]; // Get the last added track
      audioPlayerProps.playTrack(lastTrack); // Play the last track
    }
  }, [queueSong]);
  // Function to open PlayScreen
  const openPlayScreen = () => {
    setIsPlayScreenOpen(true);
  };

  const closePlayScreen = () => {
    setIsPlayScreenOpen(false);
  };

  useEffect(() => {
    console.log(queueSong[audioPlayerProps.currentSongIndex].artists);
  }, []);

  return (
    <Box
      className="playBar"
      sx={{
        display: "flex",
        justifyContent: "space-center",
        alignItems: "center",
        backgroundColor: "#323232",
        color: "white",
        opacity: 0.9,
        height: "10%",
        minHeight: "65px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: "1000",
      }}
    >
       <audio controls ref={audioPlayerProps.audioRef} style={{ display: 'none'}}>
        {queueSong.length > 0 && (
          <source
            src={srcTrack}
            type="audio/mpeg"
          />
        )}
      </audio>

      {/* Song details */}
      <Box sx={{ display: "flex",
          alignItems: "center",
          gap: "10px" ,
          width: "20%",
          position: "relative",
          paddingLeft: "20px"}}>
        <img
          src={ "https://www.scdn.co/i/_global/open-graph-default.png"}
          alt="img"
          style={{
            width: "20%",
            height: "20%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <Box>
          <p style={{ margin: 0, fontSize: "1.2em" }}>
            {queueSong[audioPlayerProps.currentSongIndex].title}
          </p>
           {Array.isArray(queueSong[audioPlayerProps.currentSongIndex].artists) ? queueSong[audioPlayerProps.currentSongIndex].artists.map((artist, index) => (
                <span key={index}>
                  <a href={`/artist/${artist.id}`} style = {{color : 'white', textDecoration: 'none', fontSize: "0.7em"}}>{artist.display_name}</a>
                  {index < queueSong[audioPlayerProps.currentSongIndex].artists.length - 1 ? ", " : ""}
                </span>
          )) : "Unknown Artist"} 
        </Box>
        <MdLibraryAdd size={20} />
      </Box>

      {/* Play, pause, and seek controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          // justifyContent: "space-center",
          width: "40%",
          // position: "relative",
        }}
      >
        <Box sx={{ display: "flex",
            gap: "20px",
            paddingTop: "30px"}}>
          <MdShuffle size={20} />
          <MdSkipPrevious size={24} onClick={audioPlayerProps.handlePrevious} />
          <div onClick={audioPlayerProps.togglePlayPause}>
            {audioPlayerProps.isPause ? <MdPlayArrow size={24} /> : <MdPause size={24} />}
          </div>
          <MdSkipNext size={24}  onClick={audioPlayerProps.handleNext} />
          <div>
            <MdReplay size={20} onClick={audioPlayerProps.handleReplay} />
          </div>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            paddingBottom: "20px",
            height: "20px",
            // color: "#FD8989",
          }}
        >
          <p>{audioPlayerProps.formatDuration(audioPlayerProps.currentTime)}</p>
          <Slider
            aria-label="time-indicator"
            size="15px"
            value={isNaN(audioPlayerProps.seekValue) ? 0 : audioPlayerProps.seekValue}
            onChange={audioPlayerProps.handleSeekChange}
            sx={{
              color: "#e75565",
              height: 5,
              "& .MuiSlider-thumb": { display: "none" },
              width: "80%",
            }}
          />
    
          <p>
            {Math.floor(queueSong[audioPlayerProps.currentSongIndex].duration / 60)} :{" "}
            {queueSong[audioPlayerProps.currentSongIndex].duration % 60}
          </p>
        </Box>
      </Box>

      {/* Volume control */}
      <Box sx={{ display: "flex", 
        alignItems: "center", 
        gap: "10px" ,
        width: "15%",
        position: "relative"}}>
        {audioPlayerProps.currentVolume === 0 ? (
          <MdVolumeMute size={20} />
        ) : (
          <MdVolumeUp size={20} />
        )}
        <Slider
            aria-label="time-indicator"
            size="15px"
            value={audioPlayerProps.currentVolume}
            onChange={audioPlayerProps.handleVolumeChange}
            sx={{
              color: "#e75565",
              height: 5,
              "& .MuiSlider-thumb": { display: "none" },
              width: "70%",
            }}
          />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" , width: "10%", position: "relative"}}>
        <MdQueueMusic size={20} />
        {/* <Link to={`/play/${firstSong.id}`} style={{textDecoration: 'none', color: 'black'}}> */}
        <MdZoomOutMap size={20} onClick={openPlayScreen} />
        {/* </Link> */}
      </Box>
      <Modal
        open={isPlayScreenOpen}
        onClose={closePlayScreen}
        aria-labelledby="play-screen"
        aria-describedby="play-music-screen"
      >
        <div
          style={
            {
              /* Apply your styles here */
            }
          }
        >
          <PlayScreen onClose={closePlayScreen} audioPlayerProps={audioPlayerProps} queueSong={queueSong} />{" "}
          {/* Pass close function as a prop */}
        </div>
      </Modal>
    </Box>
  );
}

export default MusicPlayer;
