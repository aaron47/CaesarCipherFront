import { Injectable } from '@angular/core';
import { AbstractService } from '../shared/abstract-service';

@Injectable({
  providedIn: 'root',
})
export class AesService extends AbstractService {
  constructor() {
    super("http://localhost:8080/api/v1/aes");
  }
}
