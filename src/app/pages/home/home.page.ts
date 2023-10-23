import { Component } from '@angular/core';
import { CaesarCipherService } from 'src/app/services/caesar-cipher.service';
import { CaesarPolyalphabeticService } from 'src/app/services/caesar-polyalphabetic-service';
import { ReplacementService } from 'src/app/services/replacement-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage {
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
      .subscribe((res) => (this.polyalphabeticText = res.text));
  }

  polyalphabeticDecrypt() {
    return this.polyalphabetic
      .decrypt(this.polyalphabeticText)
      .subscribe((res) => (this.polyalphabeticText = res.text));
  }

  replacementEncrypt() {
    return this.replacement
      .encrypt(this.replacementText)
      .subscribe((res) => (this.replacementText = res.text));
  }

  replacementDecrypt() {
    return this.replacement
      .decrypt(this.replacementText)
      .subscribe((res) => (this.replacementText = res.text));
  }
}
