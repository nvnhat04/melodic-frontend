import Client from "../client.api";

const Search = {
    async searchTracks(query) {
        try {
            const response = await Client.get(`/search/tracks`, {
                params: { q: query },
            });
            return response; // Return the data directly
        } catch (error) {
            if (error.response) {
                return error.response; // Return the error response data
            }
            throw error; // Throw unexpected errors
        }
    },

    async searchAlbums(query) {
        try {
            const response = await Client.get(`/search/albums`, {
                params: { q: query },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    },

    async searchArtists(query) {
        try {
            const response = await Client.get(`/search/artists`, {
                params: { q: query },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    },

    async browseByGenre(genre_id, page = 1, limit = 10) {
        try {
            const response = await Client.get(`/search/genres`, {
                params: { genre_id: genre_id, page, limit },
            });
            return response; // Trả về danh sách tracks
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    }
};

export default Search;
