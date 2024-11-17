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
import PlayScreen from "../../pages/PlayScreen";
import useAudioPlayer from "../../hooks/useAudioPlayer";

const queueSong = [
    {
        id: 1,
        title: "Song 1",
        artist: "Artist 1",
        img: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/8/3/6/c/836cf31f036fb8f89b78cfd07cd77477.jpg",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        desc: "Description 1",
        duration: "372",
    },
    {
        id: 2,
        title: "Song 2",
        artist: "Artist 2",
        img: "https://hips.hearstapps.com/hmg-prod/images/eminem-a-k-a-marshall-bruce-mathers-iii-attends-a-ceremony-news-photo-1698936282.jpg?crop=1.00xw:0.667xh;0,0.0380xh&resize=640:*",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        desc: "Description 2",
        duration: "279",
    },
    {
        id: 3,
        title: "Song 3",
        artist: "Artist 3",
        img: "",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        desc: "Description 3",
        duration: "240",
    }
]
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function MusicPlayer() {
//       const
//       {isPause,
//       seekValue,
//       currentTime,
//       currentVolume,
//       audioRef,
//       togglePlayPause,
//       handleSeekChange,
//       handleVolumeChange,
//       formatDuration,
//       currentSongIndex,
//       handleNext,
//       handlePrevious,
//       handleReplay,
//   } = useAudioPlayer(queueSong);
  //     const [isPause, setIsPause] = useState(true);
  //     const [seekValue, setSeekValue] = useState(0);
  //     const [currentTime, setCurrentTime] = useState(0);
  //     const [currentVolume, setCurrentVolume] = useState(100);
  //     const audioRef = useRef(null);

  //     const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [isPlayScreenOpen, setIsPlayScreenOpen] = useState(false);

  const audioPlayerProps = useAudioPlayer(queueSong);

  // Function to open PlayScreen
  const openPlayScreen = () => {
    setIsPlayScreenOpen(true);
  };
  const closePlayScreen = () => {
    setIsPlayScreenOpen(false);
  };
 // console.log("seekValue in MusicPlayer", audioPlayerProps.seekValue);

  //     const togglePlayPause = () => {
  //         if (isPause) {
  //             audioRef.current.play().catch((error) => {
  //                 console.log('Playback error:', error);
  //             }); // Play the audio
  //         } else {
  //             audioRef.current.pause(); // Pause the audio
  //         }
  //         setIsPause(!isPause);
  //     };
  //       const handleNext = () => {
  //         const nextSongIndex = (currentSongIndex + 1) % queueSong.length; // Loop back to the first song if at the end
  //         console.log("seekvalue", seekValue);
  //         console.log(currentSongIndex);
  //         setCurrentSongIndex(nextSongIndex);

  //         const nextSong = queueSong[nextSongIndex];
  //         audioRef.current.src = nextSong.file;

  //         // Add an event listener for loadedmetadata to ensure the duration is loaded
  //         audioRef.current.addEventListener('loadedmetadata', () => {
  //             //audioRef.current.play();
  //             setIsPause(true); // Ensure the play/pause state is updated
  //             setCurrentTime(0); // Reset the current time
  //             setSeekValue(0); // Reset the seek value
  //         }, { once: true }); // Use { once: true } to ensure the event listener is removed after it fires
  //     };
  //     const handlePrevious = () => {
  //         const previousSongIndex = (currentSongIndex - 1 + queueSong.length) % queueSong.length; // Loop back to the last song if at the beginning
  //         setCurrentSongIndex(previousSongIndex);
  //         const previousSong = queueSong[previousSongIndex];
  //         audioRef.current.src = previousSong.file;

  //          // Add an event listener for loadedmetadata to ensure the duration is loaded
  //         audioRef.current.addEventListener('loadedmetadata', () => {
  //             //audioRef.current.play();
  //             setIsPause(true); // Ensure the play/pause state is updated
  //             setCurrentTime(0); // Reset the current time
  //             setSeekValue(0); // Reset the seek value
  //         }, { once: true }); // Use { once: true } to ensure the event listener is removed after it fires
  //     };

  //     const handleSeekChange = (event) => {
  //         const newValue = event.target.value;
  //         setSeekValue(newValue);
  //         requestAnimationFrame(() => {
  //           audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
  //         });
  //     };

  //     const handleTimeUpdate = () => {
  //         const currentTimeTrack = audioRef.current.currentTime;
  //         const duration = audioRef.current.duration;
  //         setSeekValue((currentTimeTrack / duration) * 100);
  //         setCurrentTime(currentTimeTrack);
  //     };
  //     const handleVolumeChange = (event) => {
  //         const newValue = event.target.value;
  //         setCurrentVolume(newValue);
  //         audioRef.current.volume = newValue / 100;
  //     }
  //     const handleReplay = () => {
  //         console.log(currentTime);
  //         if(currentTime >= queueSong[currentSongIndex].duration){
  //             audioRef.current.currentTime = 0;
  //             setIsPause(true);
  //         audioRef.current.pause();
  //         } else{
  //             audioRef.current.currentTime = currentTime;
  //         }

  //     }
  //     useEffect(() => {
  //         const audio = audioRef.current;
  //         audio.addEventListener('timeupdate', handleTimeUpdate);
  //         audio.addEventListener('loadedmetadata', () => {
  //             console.log('Audio duration:', audio.duration);
  //         });

  //         return () => {
  //             audio.removeEventListener('timeupdate', handleTimeUpdate);
  //         };
  //     }, []);

  //     const formatDuration = (duration) => {
  //         const minutes = Math.floor(duration / 60);
  //         const seconds = Math.floor(duration % 60);
  //         return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  //     };
  //     const debouncedHandleSeekChange = debounce(handleSeekChange, 100);

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
      <audio ref={audioPlayerProps.audioRef} src={queueSong[audioPlayerProps.currentSongIndex].file} />

      {/* Song details */}
      <Box sx={{ display: "flex",
          alignItems: "center",
          gap: "10px" ,
          width: "20%",
          position: "relative",
          paddingLeft: "20px"}}>
        <img
          src={queueSong[audioPlayerProps.currentSongIndex].img ? queueSong[audioPlayerProps.currentSongIndex].img : "https://www.scdn.co/i/_global/open-graph-default.png"}
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
          <p style={{ margin: 0, fontSize: "0.7em" }}>
            {queueSong[audioPlayerProps.currentSongIndex].artist}
          </p>
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
