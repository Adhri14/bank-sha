import { GET_ALL_BANK } from '../key';

const iniState = {
    data: [],
};

export const bankReducer = (state = iniState, action) => {
    switch (action.type) {
        case GET_ALL_BANK:
            return {
                ...state,
                data: action.value.data,
            };

        default:
            return state;
    }
};
