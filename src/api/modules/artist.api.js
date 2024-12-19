import Client from "../client.api";

const Artist = {
  async addAlbum(data) {
    if (data) {
      console.log("Data:", data);
    } else {
      console.log("No data received");
    }

    try {
      const response = await Client.post("/artist/add-album", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllAlbums(id) {
    // console.log('Artist ID:', id);
    try {
      const response = await Client.get(`/artist/${id}/albums`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getRequestedTracks(id) {
    try {
      const response = await Client.get(`/artist/pending/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async approveCollaboration(data) {
    try {
      const response = await Client.put("/artist/approve-track", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async rejectCollaboration(data) {
    try {
      const response = await Client.put("/artist/reject-track", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getOrders(accessToken) {
    try {
      const response = await Client.get(`/artist/orders`, {
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

  getAllTracks: async (artistId) => {
    try {
      const response = await Client.get(`/artist/${artistId}/tracks`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  getWeeklyOrders: async (artistId) => {
    try {
      const response = await Client.get(`/artist/${artistId}/weekly-orders`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  getWeeklyCustomers: async (artistId) => {
    try {
      const response = await Client.get(`/artist/${artistId}/weekly-customers`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  getWeeklySales: async (artistId) => {
    try {
      const response = await Client.get(`/artist/${artistId}/weekly-sales`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  getWeeklyStreams: async (artistId) => {
    try {
      const response = await Client.get(`/artist/${artistId}/weekly-streams`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  getMostPlayedTracks: async (artistId) => {
    try {
      const response = await Client.get(
        `/artist/${artistId}/most-played-tracks`
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  getMerchandiseTypes: async (artistId) => {
    try {
      const response = await Client.get(
        `/artist/${artistId}/merchandise/types`
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
};
export default Artist;
