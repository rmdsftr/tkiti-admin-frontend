import api from "./api";

export const userService = {
    getAllUsers: async() => {
        const response = await api.get('/admin');
        return response.data
    }
}