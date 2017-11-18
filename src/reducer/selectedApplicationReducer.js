import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedApplicationReducer = (state = initialState.selectedApplicationReducer, action) => {
    switch(action.type) {

        case ActionType.GET_APPLICATION_RESPONSE: {
            return {
                ...state,
                application: _.assign(action.application)
            };
        }


        default: { return state; }
    }
};


export default selectedApplicationReducer;