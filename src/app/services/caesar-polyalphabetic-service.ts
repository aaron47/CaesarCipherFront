import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})
export class CaesarPolyalphabeticService extends AbstractService {
  constructor() {
    super('http://localhost:8080/api/v1/polyalphabetic');
  }
}
