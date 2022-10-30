import axios from 'axios';
import { API_URL } from '../../services/config';
import { getDataFromLocalStorge } from '../../storage';
import { GET_ALL_TRANSACTIONS } from '../key';

export const transactionAction = () => dispatch => {
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .get(`${API_URL}/transactions`, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(res => {
                dispatch({
                    type: GET_ALL_TRANSACTIONS,
                    value: { data: res.data.data },
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    });
};
