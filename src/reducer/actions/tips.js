import axios from 'axios';
import { API_URL } from '../../services/config';
import { getDataFromLocalStorge } from '../../storage';
import { GET_ALL_TIPS } from '../key';

export const tipsAction = () => dispatch => {
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .get(`${API_URL}/tips`, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(res => {
                dispatch({
                    type: GET_ALL_TIPS,
                    value: { tips: res.data.data },
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    });
};
