import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaesarCipherService {
  private BASE_URL = 'http://localhost:8080/api/v1/caesar';

  constructor(private readonly http: HttpClient) {}

  encrypt(text: string) {
    return this.http.post<{text: string}>(`${this.BASE_URL}/encrypt`, text);
  }

  decrypt(text: string) {
    return this.http.post<{text: string}>(`${this.BASE_URL}/decrypt`, text);
  }
}
