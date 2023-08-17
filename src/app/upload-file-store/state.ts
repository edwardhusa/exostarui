export enum UploadStatus {
    Ready = 'Ready',
    Requested = 'Requested',
    Started = 'Started',
    Failed = 'Failed',
    Completed = 'Completed'
}

export interface State {
    status: UploadStatus;
    error: string | null;
    progress: number | null;
    result: string | null;
}

export const initialState: State = {
    status: UploadStatus.Ready,
    error: null,
    progress: null,
    result: null
};