import { combineReducers } from 'redux';
import { reducerRegister } from './auth';
import { bankReducer } from './bank';
import { settingReducer } from './setting';
import { userReducer } from './user';
import { transactionReducer } from './transaction';
import { tipsReducer } from './tips';
import { providerReducer } from './provider';

const reducer = combineReducers({
    register: reducerRegister,
    setting: settingReducer,
    user: userReducer,
    bank: bankReducer,
    transactions: transactionReducer,
    tips: tipsReducer,
    providers: providerReducer,
});

export default reducer;
