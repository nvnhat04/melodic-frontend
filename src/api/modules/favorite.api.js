import Client from "../client.api";

const Favorite = {
    async getListFavorites(accessToken) {
        try {
            const response = await Client.get("/favorite", {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            return error.response || { status: 500, message: "Unexpected error occurred." };
        }
    },

    async addFavorite(data, accessToken) {
        try {
            const response = await Client.post("/favorite/add", data, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            return error.response || { status: 500, message: "Unexpected error occurred." };
        }
    },

    async removeFavorite(data, accessToken) {
        try {
            const response = await Client.delete("/favorite", {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
                data, // Correctly include data in the config object
            });
            return response;
        } catch (error) {
            return error.response || { status: 500, message: "Unexpected error occurred." };
        }
    },
};

export default Favorite;
