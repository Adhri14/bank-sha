import axios from 'axios';
import { API_URL } from '../../services/config';

export const registerService = async (body, headers) => {
    try {
        const res = await axios.post(
            `${API_URL}/register`,
            body,
            headers || { 'Content-Type': 'application/json' },
        );
        return res.data;
    } catch (error) {
        return error.response;
    }
};

export const loginService = async (body, headers) => {
    try {
        const res = await axios.post(
            `${API_URL}/login`,
            body,
            headers || { 'Content-Type': 'application/json' },
        );
        return res.data;
    } catch (error) {
        return error.response;
    }
};
