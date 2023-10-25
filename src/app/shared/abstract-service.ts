import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class AbstractService {
  protected constructor(private readonly baseUrl: string) {}

  private readonly http = inject(HttpClient);

  encrypt(text: string) {
    return this.http.post<{ text: string }>(`${this.baseUrl}/encrypt`, text);
  }

  decrypt(text: string) {
    return this.http.post<{ text: string }>(`${this.baseUrl}/decrypt`, text);
  }
}
