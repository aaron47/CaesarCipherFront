import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../utils/types/response';
import { Algorithm } from '../utils/types/algorithm';

@Injectable({ providedIn: 'root' })
export class FileService {
  private readonly API_URL = 'http://localhost:8080/api/v1';

  constructor(private readonly http: HttpClient) {}

  upload(
    formData: FormData,
    algorithm: Algorithm,
  ): Observable<HttpEvent<Response>> {
    let response: Observable<HttpEvent<Response>>;

    switch (algorithm) {
      case Algorithm.CAESEAR_CIPHER:
        response = this.http.post<Response>(
          `${this.API_URL}/caesar/upload/encrypt`,
          formData,
          {
            reportProgress: true,
            observe: 'events',
          },
        );
        break;
      case Algorithm.CAESAR_CIPHER_POLYALPHABETIC:
        response = this.http.post<Response>(
          `${this.API_URL}/polyalphabetic/upload/encrypt`,
          formData,
          {
            reportProgress: true,
            observe: 'events',
          },
        );
        break;
      case Algorithm.REPLACEMENT:
        response = this.http.post<Response>(
          `${this.API_URL}/replacement/upload/encrypt`,
          formData,
          {
            reportProgress: true,
            observe: 'events',
          },
        );
        break;
      case Algorithm.COLUMN_TRANSPOSITION:
        response = this.http.post<Response>(
          `${this.API_URL}/column_transposition/upload/encrypt`,
          formData,
          {
            reportProgress: true,
            observe: 'events',
          },
        );
        break;
    }

    return response;
  }

  download(fileName: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.API_URL}/download/${fileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }
}
