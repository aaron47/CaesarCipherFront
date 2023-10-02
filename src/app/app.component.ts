import { CaesarCipherService } from './services/caesar-cipher.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  text: string = '';

  constructor(private readonly caesar: CaesarCipherService) {}

  encrypt() {
    return this.caesar
      .encrypt(this.text)
      .subscribe((res) => (this.text = res.text));
  }

  decrypt() {
    return this.caesar
      .decrypt(this.text)
      .subscribe((res) => (this.text = res.text));
  }
}
