import * as ActionType from './ActionType';
import ApplicationApi from '../api/ApplicationApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getApplicationsResponse = applications => ({
    type: ActionType.GET_APPLICATIONS_RESPONSE,
    applications
});



export function getApplicationsAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return ApplicationApi.getAllApplications()
            .then(applications => {
                dispatch(getApplicationsResponse(applications));
            }).catch(error => {
                throw error;
            });
    };
}



export const addNewApplicationResponse = () => ({
    type: ActionType.ADD_NEW_APPLICATION_RESPONSE
});



export const updateExistingApplicationResponse = () => ({
    type: ActionType.UPDATE_EXISTING_APPLICATION_RESPONSE
});



export function saveApplicationAction(applicationBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        
        return ApplicationApi.saveApplication(applicationBeingAddedOrEdited)
            .then(() => {
                if (applicationBeingAddedOrEdited.id) {
                    dispatch(updateExistingApplicationResponse());
                } else {
                    dispatch(addNewApplicationResponse());
                }
            }).then(() => {
                dispatch(getApplicationsAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}



export const getApplicationResponse = applicationFound => ({
    type: ActionType.GET_APPLICATION_RESPONSE,
    application: applicationFound
});



export function getApplicationAction(applicationId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return ApplicationApi.getApplication(applicationId)
            .then(application => {
                dispatch(getApplicationResponse(application));
            }).catch(error => {
                throw error;
            });
    };
}



export const deleteApplicationResponse = () => ({
    type: ActionType.DELETE_APPLICATION_RESPONSE
});



export function deleteApplicationAction(applicationId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return ApplicationApi.deleteApplication(applicationId)
            .then(() => {
                dispatch(deleteApplicationResponse());
            }).then(() => {
                dispatch(getApplicationsAction());
            }).catch(error => {
                throw error;
            });
    };
}