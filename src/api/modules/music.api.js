import Client from "../client.api";
const Music = {
    async getTopAlbums() {
        try {
            const response = await Client.get("/music/top-albums");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getTopArtists() {
        try {
            const response = await Client.get("/music/top-artists");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getNewReleases() {
        try {
            const response = await Client.get("/music/new-releases");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async getPublicPlaylists() {
        try {
            const response = await Client.get("/music/public-playlists");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async addPlayRecord(data, token) {
        try {
            const response = await Client.post("/music/play-record", data,
                {
                    headers: {
                        token: `Bearer ${token}`,
                    }
                }
            );
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    }
}
export default Music;

