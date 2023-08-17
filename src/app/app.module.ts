import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from 'src/app/file-upload/file-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EffectsModule } from '@ngrx/effects';

import { HttpClientModule } from '@angular/common/http';
import { UploadFileStoreModule } from './upload-file-store/upload-file-store.module';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    UploadFileStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
