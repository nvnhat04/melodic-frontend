import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import MoreMenu from "../common/MoreMenu";

const PlaylistMenu = ({ playlist, onEdit, onDelete }) => {
    const menuItems = [
        {
            text: "Edit Playlist",
            onClick: onEdit,
            icon: <Edit />,
        },
        {
            text: "Delete Playlist",
            onClick: onDelete,
            icon: <Delete />,
        },
    ];
    return (
        <MoreMenu menuItems={menuItems} isVertical={false} />
    );
};

export default PlaylistMenu;