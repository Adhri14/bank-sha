import { GET_ALL_TRANSACTIONS } from '../key';

const initState = {
    data: [],
};

export const transactionReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_TRANSACTIONS:
            return {
                ...state,
                data: action.value.data,
            };
        default:
            return state;
    }
};
