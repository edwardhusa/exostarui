import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFileUploadActions from 'src/app/upload-file-store/actions';
import * as fromFileUploadSelectors from 'src/app/upload-file-store/selectors';
import * as fromFileUploadState from 'src/app/upload-file-store/state';


@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
    @Input() placeholder = "Attach files";
    @ViewChild('inputForm') readonly inputForm!: any;


    completed$: Observable<boolean>;
    progress$: Observable<number>;
    error$: Observable<string>;
    result$: Observable<string>;

    isInProgress$: Observable<boolean>;
    isReady$: Observable<boolean>;
    hasFailed$: Observable<boolean>;


    constructor(private store$: Store<fromFileUploadState.State>) {
        this.completed$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileCompleted)
        );

        this.progress$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileProgress)
        );

        this.error$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileError)
        );

        this.result$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileResult)
        );

        this.isInProgress$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileInProgress)
        );

        this.isReady$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileReady)
        );

        this.hasFailed$ = this.store$.pipe(
            select(fromFileUploadSelectors.selectUploadFileFailed)
        );
    }

    files!: FileList;
    filesLabel = '';
    multipleFilesAccepted = true;



    onSelectFiles(event: any): void {
        this.files = event.target.files ?? null;
        this.filesLabel = this.getFilesLabel();
    }

    getFilesName() {
        return this.filesLabel;
    }

    getFilesLabel(): string {
        const filesSelected = this.files?.length;
        switch (filesSelected) {
            case 0: return 'No file selected';
            case 1: return this.files[0].name;
            default: return `${this.files.length} files selected`;
        }
    }

    onUploadFiles(): void {
        this.uploadFile(this.files);
        this.inputForm.nativeElement.reset();
    }

    uploadFile(files: FileList) {
        const fileList: FileList = { ...this.files }

        this.store$.dispatch(
            new fromFileUploadActions.UploadRequestAction({
                files: fileList
            })
        );

        // clear the input form
        this.inputForm.nativeElement.reset();
    }

    resetUpload() {
        this.store$.dispatch(new fromFileUploadActions.UploadResetAction());
    }

    cancelUpload() {
        this.store$.dispatch(new fromFileUploadActions.UploadCancelAction());
    }



}