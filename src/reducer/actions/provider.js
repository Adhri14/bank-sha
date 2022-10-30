import axios from 'axios';
import { API_URL } from '../../services/config';
import { getDataFromLocalStorge } from '../../storage';
import { GET_ALL_PROVIDERS } from '../key';

export const providerAction = () => dispatch => {
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .get(`${API_URL}/operator_cards`, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(res => {
                dispatch({
                    type: GET_ALL_PROVIDERS,
                    value: { providers: res.data.data },
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    });
};
