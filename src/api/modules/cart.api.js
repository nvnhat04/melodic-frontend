import Client from "../client.api";

const Cart = {
  async getCartById(id, accessToken) {
    try {
      const response = await Client.get(`/cart/${id}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async updateQuantity(data, accessToken) {
    try {
      const response = await Client.put(`/cart/update`, data, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        console.error("Error:", error.message);
        throw error;
      }
    }
  },

  async deleteItem(userId, merchandiseId, accessToken) {
    try {
      const response = await Client.delete(`/cart/delete`, {
        data: { userId, merchandiseId },
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        console.error("Error:", error.message);
        throw error;
      }
    }
  },

  async addToCart(data, accessToken) {
    try {
      const response = await Client.post(`/cart/add`, data, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        console.error("Error:", error.message);
        throw error;
      }
    }
  },
};

export default Cart;
