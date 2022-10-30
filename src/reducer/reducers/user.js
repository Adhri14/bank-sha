import { SET_USER } from '../key';

const initUser = {
    user: {},
};

export const userReducer = (state = initUser, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.value.user,
            };

        case 'RESET_USER':
            return initUser;

        default:
            return state;
    }
};
