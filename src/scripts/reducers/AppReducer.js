import { combineReducers } from 'redux';
import MeReducer from 'scripts/reducers/MeReducer';

export default combineReducers({
    me:MeReducer
})