import { API_URL } from '../../services/config';
export const userService = async token => {
    try {
        const res = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        return error.response;
    }
};
