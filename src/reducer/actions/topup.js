import axios from 'axios';
import { Linking } from 'react-native';
import { ToastMessage } from '../../components';
import { API_URL } from '../../services/config';
import { getDataFromLocalStorge } from '../../storage';
import StaticColor from '../../utils/Colors';

export const topUpAction = (navigation, data) => () => {
    console.log('data : ', data);
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .post(`${API_URL}/top_ups`, data, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(async res => {
                await Linking.openURL(res.data.redirect_url);
                navigation.replace('TopUpSuccess', { nameScreen: 'top_up' });
            })
            .catch(err => {
                console.log(err.response);
                ToastMessage.show({
                    message: err.message,
                    backgroundColor: StaticColor.errorColor,
                    type: 'danger',
                });
            });
    });
};

export const paketDataAction = (navigation, data) => () => {
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .post(`${API_URL}/data_plans`, data, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(res => {
                navigation.replace('TopUpSuccess', {
                    nameScreen: 'paket_data',
                });
            })
            .catch(err => {
                console.log('error : ', err.response);
                ToastMessage.show({
                    message: err.message,
                    backgroundColor: StaticColor.errorColor,
                    type: 'danger',
                });
            });
    });
};

export const transferAction = (navigation, data) => () => {
    getDataFromLocalStorge('userProfile').then(token => {
        axios
            .post(`${API_URL}/transfers`, data, {
                headers: { Authorization: `Bearer ${token.token}` },
            })
            .then(res => {
                navigation.replace('TopUpSuccess', {
                    nameScreen: 'transfer',
                });
            })
            .catch(err => {
                console.log('error : ', err.response);
                ToastMessage.show({
                    message: err.message,
                    backgroundColor: StaticColor.errorColor,
                    type: 'danger',
                });
            });
    });
};
