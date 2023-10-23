import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../utils/types/response';

@Injectable({ providedIn: 'root' })
export class FileService {
  private API_URL = 'http://localhost:8080/api/v1/caesar';

  constructor(private readonly http: HttpClient) {}

  upload(formData: FormData): Observable<HttpEvent<Response>> {
    return this.http.post<Response>(
      `${this.API_URL}/upload/encrypt`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  download(fileName: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.API_URL}/download/${fileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }
}
