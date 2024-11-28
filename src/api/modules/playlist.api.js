import Client from "../client.api";
const Playlist = {
    async getPlaylists(id) {
        try {
            const response = await Client.get("/playlist/:id");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getAllPlaylists() {
        try {
            const response = await Client.get("/playlist/all");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async deletePlaylist(id) {
        try {
            const response = await Client.delete(`/playlist/delete/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
}
export default Playlist;

