import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { EncryptOrDecrypt } from '../utils/types/encrypt-or-decrypt';
import { Algorithm } from '../utils/types/algorithm';
import { Observable } from 'rxjs';

export abstract class AbstractService {
  protected constructor(private readonly baseUrl: string) {}

  private readonly http = inject(HttpClient);
  private data$!: Observable<{ text: string }>;

  encrypt(encryptOrDecryptData: EncryptOrDecrypt, algorithm: Algorithm) {
    const { text, shift, key } = encryptOrDecryptData;
    const caesarData = { text, shift };
    const polyalphabeticData = { text, key };

    switch (algorithm) {
      case Algorithm.CAESEAR_CIPHER:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/encrypt`,
          caesarData,
        );
        break;
      case Algorithm.CAESAR_CIPHER_POLYALPHABETIC:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/encrypt`,
          polyalphabeticData,
        );
        break;
      case Algorithm.REPLACEMENT:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/encrypt`,
          text,
        );
        break;
      case Algorithm.COLUMN_TRANSPOSITION:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/encrypt`,
          polyalphabeticData,
        );
    }

    return this.data$;
  }

  decrypt(encryptOrDecryptData: EncryptOrDecrypt, algorithm: Algorithm) {
    const { text, shift, key } = encryptOrDecryptData;
    const caesarData = { text, shift };
    const polyalphabeticData = { text, key };

    switch (algorithm) {
      case Algorithm.CAESEAR_CIPHER:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          caesarData,
        );
        break;
      case Algorithm.CAESAR_CIPHER_POLYALPHABETIC:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          polyalphabeticData,
        );
        break;
      case Algorithm.REPLACEMENT:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          text,
        );
        break;
      case Algorithm.COLUMN_TRANSPOSITION:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          polyalphabeticData,
        );
        break;
      case Algorithm.DES:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          text,
        );
        break;
      case Algorithm.AES:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          text,
        );
        break;
      case Algorithm.RSA:
        this.data$ = this.http.post<{ text: string }>(
          `${this.baseUrl}/decrypt`,
          text,
        );
        break;
    }

    return this.data$;
  }
}
