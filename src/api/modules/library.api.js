import Client from "../client.api";
const Library = {
    async getRecentTracks(accessToken, page = 1, limit = 10) {
        try {
            const response = await Client.get("/library/recent-tracks",{
                headers: {
                    token: `Bearer ${accessToken}`,
                },
                params: { page, limit },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getRecentArtists(accessToken, page = 1, limit = 10) {
        try {
            const response = await Client.get("/library/recent-artists", {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
                params: { page, limit },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getRecentAlbums(accessToken, page = 1, limit = 10) {
        try {
            const response = await Client.get("/library/recent-albums", {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
                params: { page, limit },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
}
export default Library;

