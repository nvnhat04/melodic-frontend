import MoreMenu from "./MoreMenu";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayIcon from '@mui/icons-material/PlayArrow';

const SongCardMenu = ({songId, bgColor}) => {
    const menuItems = [
        {
        text: "Add to Playlist",
        onClick: () => addSongToPlaylist(songId),
        icon : <AddIcon />,
        },
        {
        text: "Play Next",
        onClick: () => console.log("Play Next Clicked"),
        icon: <PlayIcon />,
        },
        {
        text: "Play Last",
        onClick: () => console.log("Play Last Clicked"),
        icon: <PlayIcon />,
        },
        {
        text: "Favorite",
        onClick: () => console.log("Favorite Clicked"),
        icon: <FavoriteIcon />,
        }
    ];

    const addSongToPlaylist = (songId) => {
        console.log(`Song with ID ${songId} added to playlist`);
    }
    
    return <MoreMenu menuItems={menuItems} bgColor={bgColor} />;
    }

export default SongCardMenu;