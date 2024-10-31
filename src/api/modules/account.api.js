import Client from "../client.api";

const Account = {
    async login(data) {
        try {
            const response = await Client.post("/account/login", data);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async register(data) {
        try {
            const response = await Client.post("/account/register", data);
            return response;
        }catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    }
}
export default Account;