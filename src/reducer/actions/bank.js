import axios from 'axios';
import { API_URL } from '../../services/config';
import { getDataFromLocalStorge } from '../../storage';
import { GET_ALL_BANK } from '../key';

export const bankAction = () => dispatch => {
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .get(`${API_URL}/payment_methods`, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(res => {
                dispatch({ type: GET_ALL_BANK, value: { data: res.data } });
            })
            .catch(err => {
                console.log(err.response);
            });
    });
};
