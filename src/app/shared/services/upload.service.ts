import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
// Next, inject HttpClient and define the SERVER_URL variable which will contain the address of the file upload server:

@Injectable({
  providedIn: "root",
})
export class UploadService {
  SERVER_URL = "https://file.io/";
  constructor(private httpClient: HttpClient) {}
  // Next, add the upload() method which simply calls the post() method of HttpClient to send an HTTP POST request with form data to the file upload server:

  public upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
