import axios from 'axios';
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

export const updateUserService = async (body, token) => {
    try {
        const res = await axios.put(`${API_URL}/users`, body, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        return error.response;
    }
};

export const updatePINService = async (body, token) => {
    try {
        const res = await axios.put(`${API_URL}/wallets`, body, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        return error.response;
    }
};
