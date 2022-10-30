import { GET_ALL_PROVIDERS } from '../key';

const initState = {
    providers: [],
};

export const providerReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_PROVIDERS:
            return {
                ...state,
                providers: action.value.providers,
            };

        default:
            return state;
    }
};
