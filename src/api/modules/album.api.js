import Client from "../client.api";

const Album = {
    async getAlbumDetails(albumId) {
        try {
            const response = await Client.get(`/album/${albumId}`);
            return response;
        } catch (error) {
            return error.response || { status: 500, message: "Unexpected error occurred." };
        }
    },

    async getAllTracksInAlbum(albumId) {
        try {
            const response = await Client.get(`/album/${albumId}/tracks`);
            return response;
        } catch (error) {
            return error.response || { status: 500, message: "Unexpected error occurred." };
        }
    },

    async getRelatedMerchandises(albumId) {
        try {
            const response = await Client.get(`/album/${albumId}/merchandises`);
            return response;
        } catch (error) {
            return error.response || { status: 500, message: "Unexpected error occurred." };
        }
    },
};

export default Album;
