import Client from "../client.api";

const Merchandise = {
  async getMerchandiseById(id) {
    try {
      const response = await Client.get(`/merchandise/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllMerchandise() {
    try {
      const response = await Client.get("/merchandise/all");
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllMerchandiseByArtistId(id, sort) {
    try {
      const response = await Client.get(`/artist/${id}/merchandise`, {
        params: { sort },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async createMerchandise(merchandise, accessToken) {
    try {
      const response = await Client.post("/merchandise", merchandise, {
        headers: {
          token: `Bearer ${accessToken}`,
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

  async updateMerchandise(id, merchandise, accessToken) {
    console.log("Updating merchandise with ID:", id); // Log the ID here

    try {
      const response = await Client.put(`/merchandise/${id}`, merchandise, {
        headers: {
          token: `Bearer ${accessToken}`,
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

  async deleteMerchandise(id, accessToken) {
    try {
      const response = await Client.delete(`/merchandise/${id}`, {
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
  async getNewArrivals() {
    try {
      const response = await Client.get(`/merchandise/new-arrivals`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async getTrendingNow() {
    try {
      const response = await Client.get(`/merchandise/trending-now`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async getFavArtistStore(id) {
    try {
      const response = await Client.get(`/merchandise/fav-artist-store/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async getMerchandiseDetailById(id) {
    try {
      const response = await Client.get(`/merchandise/detail/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async getMerchandiseTotalSoldById(id) {
    try {
      const response = await Client.get(`/merchandise/total-sold/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async updateStock(id, stock) {
    try {
      const response = await Client.put(`/merchandise/update-stock/${id}`, {
        stock: stock,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllMerByArtistID(artistId) {
    try {
      const response = await Client.get(`/merchandise/all/${artistId}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async getTopSellingByArtistId(artistId) {
    try {
      const response = await Client.get(`/merchandise/top-selling/${artistId}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getBySearch(searchTerm) {
    try {
      const response = await Client.get(
        `/merchandise/search?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return { success: false, message: "An unexpected error occurred." };
    }
  },
  async getMostPopularStore() {
    try {
      const response = await Client.get(`/merchandise/most-popular-store`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
};

export default Merchandise;
