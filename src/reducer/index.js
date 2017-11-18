import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import applicationsReducer from './applicationsReducer';
import selectedApplicationReducer from './selectedApplicationReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    applicationsReducer,
    selectedApplicationReducer,
    apiReducer,
    form: formReducer    
});


