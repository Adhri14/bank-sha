import { SET_SETTING_APP } from '../key';

export const settingAction = () => dispatch => {
    dispatch({ type: SET_SETTING_APP, value: false });
};
