import Client from '../client.api';

const Track = {
    async getAllTracks() {
        try {
            const response = await Client.get('/track/all');
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getTrackById(id) {
        try {
            const response = await Client.get(`/track/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async deleteTrackById(id) {
        console.log("ID of item", id);
        try {
            const response = await Client.delete(`/track/delete/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getAllTracksDisabled() {
        try {
            const response = await Client.get('/track/disabled');
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async enableTrack(id) {
        try {
            const response = await Client.put(`/track/enable/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async disableTrack(id) {
        try {
            const response = await Client.put(`/track/disable/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async addTrack(track) {
        try {
            const response = await Client.post('/track/add', track, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async updateTrack(track) {
        try {
            const response = await Client.put('/track/update', track);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    }


};
export default Track;