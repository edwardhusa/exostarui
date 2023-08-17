import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, takeUntil } from 'rxjs/operators';
import { FileUploadService } from 'src/app/file-upload/file-upload.service';
import * as fromFileUploadActions from './actions';
import { serializeError } from 'serialize-error';

export interface UploadResponse {
    linesInFile?: number,
    linesParsed?: number,
    errors: String[]
}

@Injectable()
export class UploadFileEffects {

    uploadRequestEffect$ = createEffect(() => this.actions$.pipe(
        ofType(fromFileUploadActions.ActionTypes.UPLOAD_REQUEST),
        concatMap(action =>
            this.fileUploadService.uploadFile(action.payload.files).pipe(
                takeUntil(
                    this.actions$.pipe(
                        ofType(fromFileUploadActions.ActionTypes.UPLOAD_CANCEL)
                    )
                ),
                map(event => this.getActionFromHttpEvent(event)),
                catchError(error => of(this.handleError(error)))
            )
        )
    )
    );

    constructor(
        private fileUploadService: FileUploadService,
        private actions$: Actions<fromFileUploadActions.Actions>
    ) { }

    private getActionFromHttpEvent(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent: {
                return new fromFileUploadActions.UploadStartedAction();
            }
            case HttpEventType.UploadProgress: {
                return new fromFileUploadActions.UploadProgressAction({
                    progress: Math.round((100 * event.loaded) / (event.total || 1))
                });
            }
            case HttpEventType.ResponseHeader:
                if (event.status === 200) {
                    return new fromFileUploadActions.UploadCompletedAction({
                        result: "Upload Success!"
                    });
                } else if (event.status < 300) {
                    return new fromFileUploadActions.UploadCompletedAction({
                        result: "Upload Complete"
                    });
                } else {
                    return new fromFileUploadActions.UploadFailureAction({
                        error: event.statusText
                    });
                }
            case HttpEventType.Response: {
                let response = event as HttpResponse<UploadResponse>;
                let result = response.body as UploadResponse;
                let errorStr = "";

                if (result.errors.length > 0) {
                    let errorResult = ""
                    result.errors.forEach(error => errorResult = `${errorResult}<br>${error}`)
                    errorStr = `Errors: ${errorResult}`
                }

                let outResult = `Parsed ${result.linesParsed} of ${result.linesInFile}.<br>${errorStr}`

                if (event.status < 300) {
                    return new fromFileUploadActions.UploadCompletedAction({ result: outResult });
                } else {
                    return new fromFileUploadActions.UploadFailureAction({
                        error: `Status ${response.status}: ${outResult}`
                    });
                }
            }
            default: {
                return new fromFileUploadActions.UploadFailureAction({
                    error: `Unknown Event: ${JSON.stringify(event)}`
                });
            }
        }
    }

    private handleError(error: any) {
        const friendlyErrorMessage = serializeError(error).message;
        return new fromFileUploadActions.UploadFailureAction({
            error: friendlyErrorMessage
        });
    }
}