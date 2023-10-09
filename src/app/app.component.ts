import { CaesarCipherService } from './services/caesar-cipher.service';
import { Component } from '@angular/core';
import { CaesarPolyalphabeticService } from './services/caesar-polyalphabetic-service';
import { ReplacementService } from './services/replacement-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  text: string = '';
  polyalphabeticText: string = '';
  replacementText: string = '';

  constructor(
    private readonly caesar: CaesarCipherService,
    private readonly polyalphabetic: CaesarPolyalphabeticService,
    private readonly replacement: ReplacementService
  ) {}

  caesarEncrypt() {
    return this.caesar
      .encrypt(this.text)
      .subscribe((res) => (this.text = res.text));
  }

  caesarDecrypt() {
    return this.caesar
      .decrypt(this.text)
      .subscribe((res) => (this.text = res.text));
  }

  polyalphabeticEncrypt() {
    return this.polyalphabetic
      .encrypt(this.polyalphabeticText)
      .subscribe((res) => this.polyalphabeticText = res.text);
  }

  polyalphabeticDecrypt() {
    return this.polyalphabetic
      .decrypt(this.polyalphabeticText)
      .subscribe((res) => this.polyalphabeticText = res.text);
  }

  replacementEncrypt() {
    return this.replacement
      .encrypt(this.replacementText)
      .subscribe((res) => this.replacementText = res.text);
  }

  replacementDecrypt() {
    return this.replacement
      .decrypt(this.replacementText)
      .subscribe((res) => this.replacementText = res.text);
  }
}
