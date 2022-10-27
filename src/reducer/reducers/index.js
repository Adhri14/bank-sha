import { combineReducers } from 'redux';
import { reducerRegister } from './auth';
import { settingReducer } from './setting';

const reducer = combineReducers({
    register: reducerRegister,
    setting: settingReducer,
});

export default reducer;
