import React, { useState, useRef, useEffect } from 'react';
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdVolumeDown, MdVolumeUp, MdZoomOut, MdZoomOutMap, MdLibraryMusic, MdLibraryAdd, MdLoop, MdShuffle, MdVolumeMute, MdQueueMusic } from 'react-icons/md';
import { Box } from '@mui/material';
const Song1Data = [
    {
        id: 1,
        title: "Song 1",
        artist: "Artist 1",
        img: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/8/3/6/c/836cf31f036fb8f89b78cfd07cd77477.jpg",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        desc: "Description 1",
        duration: "372",
    },
]

function MusicPlayer() {
    const [isPause, setIsPause] = useState(true);
    const [seekValue, setSeekValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const audioRef = useRef(null);
    const firstSong = Song1Data[0];


    const togglePlayPause = () => {
        if (isPause) {
            audioRef.current.play().catch((error) => {
                console.log('Playback error:', error);
            }); // Play the audio
        } else {
            audioRef.current.pause(); // Pause the audio
        }
        setIsPause(!isPause);
    };
    

    const handleSeekChange = (event) => {
        const newValue = event.target.value;
        setSeekValue(newValue);
        audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
    };

    const handleTimeUpdate = () => {
        const currentTimeTrack = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setSeekValue((currentTimeTrack / duration) * 100);
        setCurrentTime(currentTimeTrack);
    };
    const handleVolumeChange = (event) => {
        const newValue = event.target.value;
        setCurrentVolume(newValue);
        audioRef.current.volume = newValue / 100;
    }
    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', () => {
            console.log('Audio duration:', audio.duration);
        });
    
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);
    
    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        
        <Box
            className="playBar"
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'lightgray',
                height: '80px',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex:'1000'
            }}
        >
            <audio ref={audioRef} src={firstSong.file} />

            
            {/* Song details */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px'}}>
                <img src={firstSong.img} alt="img" style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                }} />
                <Box>
                    <p style={{ margin: 0, fontSize: '20px' }}>{firstSong.title}</p>
                    <p style={{ margin: 0, fontSize: '10px' }}>{firstSong.artist}</p>
                </Box>
                <MdLibraryAdd size={20} />
            </Box>
            
            {/* Play, pause, and seek controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding:'25px 0px 5px 0px' }}>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <MdShuffle size={20} />
                    <MdSkipPrevious size={24} />
                    <div onClick={togglePlayPause}>
                    {isPause ? <MdPlayArrow size={24} /> : <MdPause size={24} />}
                    </div>
                    <MdSkipNext size={24} />
                    <MdLoop size={20}/>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width:'500px' }}>
                    <p>{formatDuration(currentTime)}</p>
                    <input
                    type="range"
                    min="0"
                    max="100"
                    value={seekValue}
                    onChange={handleSeekChange}
                    style={{ width: '80%' }}
                    />
                    <p>{Math.floor(firstSong.duration/60) } : {firstSong.duration%60}</p>
                </Box>

            </Box>

                
            {/* Volume control */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {currentVolume}
                {currentVolume === 0 ? <MdVolumeMute size={20}/> : <MdVolumeUp size={20} />  }
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={handleVolumeChange}
                    style={{ width: '100px' }} />  
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MdQueueMusic size={20} />
                <MdZoomOutMap size={20} />
            </Box>
        </Box>
    );
}

export default MusicPlayer;