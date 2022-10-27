import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const midleware = applyMiddleware(thunk);
const store = createStore(reducer, midleware);
export default store;
