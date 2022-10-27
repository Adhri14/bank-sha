import {
    CLEAR_REGISTER_REDUCER,
    SET_REGISTER_EMAIL_WITH_PASSWORD,
    SET_REGISTER_PROFILE_WITH_PIN,
} from '../key';

const initRegister = {
    name: '',
    email: '',
    password: '',
    pin: '',
    profile_picture: '',
    ktp: '',
};

export const reducerRegister = (state = initRegister, action) => {
    switch (action.type) {
        case SET_REGISTER_EMAIL_WITH_PASSWORD:
            return {
                ...state,
                name: action.value.name,
                email: action.value.email,
                password: action.value.password,
            };
        case SET_REGISTER_PROFILE_WITH_PIN:
            return {
                ...state,
                pin: action.value.pin,
                profile_picture: action.value.profile_picture,
            };
        case 'SET_KTP':
            return {
                ...state,
                ktp: action.value.ktp,
            };
        case CLEAR_REGISTER_REDUCER:
            return initRegister;
        default:
            return state;
    }
};
