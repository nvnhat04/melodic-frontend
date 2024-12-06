import {useState, useRef, useEffect} from 'react';
import createUrl from './createUrl';

function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
const useAudioPlayer = (queueSong) => {
    const [queue, setQueue] = useState(queueSong);
    const [isPause, setIsPause] = useState(true);
    const [seekValue, setSeekValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const audioRef = useRef(null);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const playTrack = (track) => {
        if (!track || !track.track_url) {
            console.error("Invalid track data");
            return;
        }
    
        const trackUrl = createUrl(track.track_url); // Create URL for the track
        audioRef.current.src = trackUrl;
    
        // Define the event handler first
        const handleLoadedMetadata = () => {
            audioRef.current.play().then(() => {
                setIsPause(false); // Update state to "playing"
                setCurrentTime(0); // Reset current time
                setSeekValue(0);   // Reset seek bar
            }).catch((error) => {
                console.error("Playback error:", error);
            });
        };
    
        // Remove any previous loadedmetadata listener to prevent duplication
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
    
        // Add a new listener for loadedmetadata
        audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    };
    
    
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
    const handleNext = () => {
        if (queueSong.length === 0) {
            console.warn("Queue is empty");
            return;
        }
    
        const nextSongIndex = (currentSongIndex + 1) % queueSong.length; // Loop back to the first song if at the end
        setCurrentSongIndex(nextSongIndex);
    
        const nextSong = queueSong[nextSongIndex];
        playTrack(nextSong); // Use the improved playTrack function
    };
    
    const handlePrevious = () => {
        const previousSongIndex = (currentSongIndex - 1 + queueSong.length) % queueSong.length; // Loop back to the last song if at the beginning
        setCurrentSongIndex(previousSongIndex);
        const previousSong = queueSong[previousSongIndex];
        audioRef.current.src = createUrl(previousSong.track_url);
        //console.log("seekvalue in Audio Player", seekValue);

         // Add an event listener for loadedmetadata to ensure the duration is loaded
        audioRef.current.addEventListener('loadedmetadata', () => {
            audioRef.current.play();
            setIsPause(false); // Ensure the play/pause state is updated
            setCurrentTime(0); // Reset the current time
            setSeekValue(0); // Reset the seek value
        }, { once: true }); // Use { once: true } to ensure the event listener is removed after it fires
    };

    const handleSeekChange = (event) => {
        const newValue = event.target.value;
        setSeekValue(newValue);
        requestAnimationFrame(() => {
          audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
        });
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
    const handleReplay = () => {
        audioRef.current.currentTime = 0;
        setIsPause(true);
        audioRef.current.pause();
    }
    useEffect(() => {
        if(currentTime >= queueSong[currentSongIndex].duration){
            // console.log("next song");
            handleNext();
        }
    }, [currentTime]);
    
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
    const debouncedHandleSeekChange = debounce(handleSeekChange, 100);



    return {
        isPause,
        seekValue,
        currentTime,
        currentVolume,
        audioRef,
        togglePlayPause,
        playTrack,
        handleSeekChange,
        handleVolumeChange,
        formatDuration,
        handleReplay,
        handleNext,
        handlePrevious,
        currentSongIndex,
        setCurrentSongIndex,
        queueSong,
    };

}

export default useAudioPlayer;