import { Action } from '@ngrx/store';

export enum ActionTypes {
    UPLOAD_REQUEST = '[File Upload Form] Request',
    UPLOAD_CANCEL = '[File Upload Form] Cancel',
    UPLOAD_RESET = '[File Upload Form] Reset',
    UPLOAD_STARTED = '[File Upload API] Started',
    UPLOAD_PROGRESS = '[File Upload API] Progress',
    UPLOAD_FAILURE = '[File Upload API] Failure',
    UPLOAD_COMPLETED = '[File Upload API] Success'
}

/**
 * Action when an upload is requested by the user via dispatch from the UI
 * file: files to be uploaded
 */
export class UploadRequestAction implements Action {
    readonly type = ActionTypes.UPLOAD_REQUEST;
    constructor(public payload: { file: File }) { }
}

/**
 * Action when an upload is cancelled by the user
 */
export class UploadCancelAction implements Action {
    readonly type = ActionTypes.UPLOAD_CANCEL;
}

/**
 * Action when reset is called
 */
export class UploadResetAction implements Action {
    readonly type = ActionTypes.UPLOAD_RESET;
}

/**
 * called by the HTTP client when the upload starts
 */
export class UploadStartedAction implements Action {
    readonly type = ActionTypes.UPLOAD_STARTED;
}

/**
 * called by the HTTP clent when a progress update occurs
 */
export class UploadProgressAction implements Action {
    readonly type = ActionTypes.UPLOAD_PROGRESS;
    constructor(public payload: { progress: number }) { }
}

/**
 * Called by the HTTP Client when it encounters an Error
 */
export class UploadFailureAction implements Action {
    readonly type = ActionTypes.UPLOAD_FAILURE;
    constructor(public payload: { error: string }) { }
}

/**
 * Called by the HTTP Client when the upload is complete
 */
export class UploadCompletedAction implements Action {
    readonly type = ActionTypes.UPLOAD_COMPLETED;
}

export type Actions =
    | UploadRequestAction
    | UploadCancelAction
    | UploadResetAction
    | UploadStartedAction
    | UploadProgressAction
    | UploadFailureAction
    | UploadCompletedAction;