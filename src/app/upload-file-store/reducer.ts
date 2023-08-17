import { Actions, ActionTypes } from './actions';
import { initialState, State, UploadStatus } from './state';

/**
 * Facilitate the changes needed upon state change
 * @param state 
 * @param action 
 * @returns 
 */
export function featureReducer(state = initialState, action: Actions): State {
    switch (action.type) {

        /**
         * Upon request, set request state
         */
        case ActionTypes.UPLOAD_REQUEST: {
            return {
                ...state,
                status: UploadStatus.Requested,
                progress: null,
                error: null
            };
        }

        /**
         * Upon Cancel, reset state to Ready
         */
        case ActionTypes.UPLOAD_CANCEL: {
            return {
                ...state,
                status: UploadStatus.Ready,
                progress: null,
                error: null
            };
        }

        /**
         * Upon explicit reset, set state to Ready
         */
        case ActionTypes.UPLOAD_RESET: {
            return {
                ...state,
                status: UploadStatus.Ready,
                progress: null,
                error: null
            };
        }

        /**
         * Upon Failure, set state to failed and push out error
         */
        case ActionTypes.UPLOAD_FAILURE: {
            return {
                ...state,
                status: UploadStatus.Failed,
                error: action.payload.error,
                progress: null
            };
        }

        /**
         * Upon Start, set state to started and update progress meter
         */
        case ActionTypes.UPLOAD_STARTED: {
            return {
                ...state,
                status: UploadStatus.Started,
                progress: 0
            };
        }

        /**
         * Upon progress update, update the progress meter with the progress state
         */
        case ActionTypes.UPLOAD_PROGRESS: {
            return {
                ...state,
                progress: action.payload.progress
            };
        }

        /** 
         * Upon completion, set completed state and fill progress meter
         */
        case ActionTypes.UPLOAD_COMPLETED: {
            return {
                ...state,
                status: UploadStatus.Completed,
                progress: 100,
                error: null,
                result: action.payload.result
            };
        }
        default: {
            return state;
        }
    }
}