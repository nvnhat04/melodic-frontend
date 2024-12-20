import axios from "axios";
import Client from "../client.api";

const AlbumAPI = {
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
            console.log("Response:12 ", response);
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
    async getTracksByAlbumId(albumId) {
        try {
            const response = Client.get(`/album/${albumId}/track`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getAlbumByID(albumId) {
        try {
            const response = Client.get(`/album/${albumId}/details`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    }
};

export default AlbumAPI;
