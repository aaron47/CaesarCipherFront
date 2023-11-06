import { Component, DestroyRef } from '@angular/core';
import { CaesarCipherService } from 'src/app/services/caesar-cipher.service';
import { CaesarPolyalphabeticService } from 'src/app/services/caesar-polyalphabetic.service';
import { ReplacementService } from 'src/app/services/replacement.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Algorithm } from '../../utils/types/algorithm';
import { EncryptOrDecrypt } from '../../utils/types/encrypt-or-decrypt';

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
    private readonly replacement: ReplacementService,
    private readonly destroyRef: DestroyRef,
  ) {}

  caesarEncrypt() {
    const encryptOrDecryptData: EncryptOrDecrypt = {
      text: this.text,
      shift: 3,
    };

    return this.caesar
      .encrypt(encryptOrDecryptData, Algorithm.CAESEAR_CIPHER)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.text = res.text));
  }

  caesarDecrypt() {
    const encryptOrDecryptData: EncryptOrDecrypt = {
      text: this.text,
      shift: 3,
    };

    return this.caesar
      .decrypt(encryptOrDecryptData, Algorithm.CAESEAR_CIPHER)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.text = res.text));
  }

  polyalphabeticEncrypt() {
    const encryptOrDecryptData: EncryptOrDecrypt = {
      text: this.polyalphabeticText,
      key: 'test',
    };

    return this.polyalphabetic
      .encrypt(encryptOrDecryptData, Algorithm.CAESAR_CIPHER_POLYALPHABETIC)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.polyalphabeticText = res.text));
  }

  polyalphabeticDecrypt() {
    const encryptOrDecryptData: EncryptOrDecrypt = {
      text: this.polyalphabeticText,
      key: 'LJKFELJKWRJKLWRJLKJGKLWJKLGWJKL',
    };

    return this.polyalphabetic
      .decrypt(encryptOrDecryptData, Algorithm.CAESAR_CIPHER_POLYALPHABETIC)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.polyalphabeticText = res.text));
  }

  replacementEncrypt() {
    const encryptOrDecryptData: EncryptOrDecrypt = {
      text: this.replacementText,
    };

    return this.replacement
      .encrypt(encryptOrDecryptData, Algorithm.REPLACEMENT)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.replacementText = res.text));
  }

  replacementDecrypt() {
    const encryptOrDecryptData: EncryptOrDecrypt = {
      text: this.replacementText,
    };

    return this.replacement
      .decrypt(encryptOrDecryptData, Algorithm.REPLACEMENT)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.replacementText = res.text));
  }
}
