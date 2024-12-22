import Client from "../client.api";

const Order = {
  async createOrderByUserId(data, accessToken) {
    try {
      const response = await Client.post(`/order/create`, data, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return { message: "An error occurred while creating the order." };
      }
    }
  },

  async addToOrderMerchandise(data, accessToken) {
    try {
      const response = await Client.post(`/order/add`, data, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while adding merchandise to the order.",
        };
      }
    }
  },

  async getAllOrderByUserId(userId, accessToken) {
    try {
      const response = await Client.get(`/order/all/${userId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while retrieving orders for the user.",
        };
      }
    }
  },

  async getOrderDetail(orderId, accessToken) {
    try {
      const response = await Client.get(`/order/${orderId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while retrieving order details.",
        };
      }
    }
  },

  async updateStatus(orderId, status, accessToken) {
    try {
      const response = await Client.put(
        `/order/update-status/${orderId}`,
        { status: status },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while updating the order status.",
        };
      }
    }
  },

  async getAllOrder() {
    try {
      const response = await Client.get(`/order/all`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while retrieving all orders.",
        };
      }
    }
  },
};

export default Order;
