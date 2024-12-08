import Client from "../client.api";
const Library = {
    async getRecentTracks(accessToken) {
        try {
            const response = await Client.get("/library/recent-tracks",{
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getRecentArtists(accessToken) {
        try {
            const response = await Client.get("/library/recent-artists", {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getRecentAlbums(accessToken) {
        try {
            const response = await Client.get("/library/recent-albums", {
                headers: {
                    token: `Bearer ${accessToken}`,
                }
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

