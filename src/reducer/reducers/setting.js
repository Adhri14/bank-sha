import { SET_SETTING_APP } from '../key';

const initApp = {
    app: true,
};

export const settingReducer = (state = initApp, action) => {
    switch (action.type) {
        case SET_SETTING_APP:
            return {
                ...state,
                app: action.value,
            };

        default:
            return state;
    }
};
