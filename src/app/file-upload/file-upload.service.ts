import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  private API_BASE_URL = "http://[::1]:8080"

  options = {
    reportProgress: true
  };



  public uploadFile(files: FileList): Observable<any> {
    let formData = new FormData();
    let reader = new FileReader();

    //TODO: finish multifile upload
    if (files.length > 1) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append('file', file, file.name)
      }
    } else {
      let file = files[0];
      formData.append('file', file, file.name)
    }


    const req = new HttpRequest(
      'POST',
      `${this.API_BASE_URL}/upload/raw`,
      formData,
      {
        reportProgress: true
      }
    );

    return this.httpClient.request(req);
  }

}
