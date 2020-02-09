import { combineReducers } from 'redux';
import requestReducer from './requestReducer.js'
import templateReducer from './templateReducer.js';

export default combineReducers({
   // template: templateReducer,
   req: requestReducer,
});