import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  private API_BASE_URL = "http://[::1]:8080"

  public uploadFile(files: FileList): Observable<HttpEvent<{}>> {
    const formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i].name);
    }

    // formData.append("reportProgress", "true");


    const req = new HttpRequest(
      'POST',
      `${this.API_BASE_URL}/upload`,
      formData
    );
    return this.httpClient.request(req);
  }

}
