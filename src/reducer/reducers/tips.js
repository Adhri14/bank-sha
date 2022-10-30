import { GET_ALL_TIPS } from '../key';

const initState = {
    tips: [],
};

export const tipsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_TIPS:
            return {
                ...state,
                tips: action.value.tips,
            };
        default:
            return state;
    }
};
