import {Component, DestroyRef} from '@angular/core';
import {FileService} from '../../services/file.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Response} from '../../utils/types/response';
import {saveAs} from 'file-saver';
import {Algorithm} from '../../utils/types/algorithm';
import {FileStatus} from 'src/app/utils/types/file-status';
import {CaesarCipherService} from 'src/app/services/caesar-cipher.service';
import {CaesarPolyalphabeticService} from 'src/app/services/caesar-polyalphabetic.service';
import {ReplacementService} from 'src/app/services/replacement.service';
import {EncryptOrDecrypt} from 'src/app/utils/types/encrypt-or-decrypt';
import {ColumnTranspositionService} from '../../services/column-transposition.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.page.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadPage {
  protected readonly Algorithm = Algorithm;

  fileNames: string[] = [];
  fileStatus: FileStatus = {
    status: '',
    requestType: '',
    percent: 0,
  };

  caesarText = '';
  polyalphabeticText = '';
  replacementText = '';
  columnTranspositionText = '';
  shift = 0;
  key = '';
  columnTranspositionKey = '';

  constructor(
    private readonly caesar: CaesarCipherService,
    private readonly polyalphabetic: CaesarPolyalphabeticService,
    private readonly replacement: ReplacementService,
    private readonly columnTransposition: ColumnTranspositionService,
    private readonly fileService: FileService,
    private readonly destroyRef: DestroyRef,
  ) {}

  decrypt(algorithm: Algorithm): void {
    const ceasarData: EncryptOrDecrypt = {
      text: this.caesarText,
      shift: this.shift,
    };

    const polyalphabeticData: EncryptOrDecrypt = {
      text: this.polyalphabeticText,
      key: this.key,
    };

    const replacementData: EncryptOrDecrypt = {
      text: this.replacementText,
    };

    const columnTranspositionData: EncryptOrDecrypt = {
      text: this.columnTranspositionText,
      key: this.columnTranspositionKey,
    }

    switch (algorithm) {
      case Algorithm.CAESEAR_CIPHER:
        this.caesar
          .decrypt(ceasarData, algorithm)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => (this.caesarText = res.text));
        break;
      case Algorithm.CAESAR_CIPHER_POLYALPHABETIC:
        this.polyalphabetic
          .decrypt(polyalphabeticData, algorithm)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => (this.polyalphabeticText = res.text));
        break;
      case Algorithm.REPLACEMENT:
        this.replacement
          .decrypt(replacementData, algorithm)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => (this.replacementText = res.text));
        break;
      case Algorithm.COLUMN_TRANSPOSITION:
        this.columnTransposition
          .decrypt(columnTranspositionData, algorithm)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => (this.columnTranspositionText = res.text));
    }
  }

  onUploadFiles(
    event: Event,
    algorithm: Algorithm,
    shift?: number,
    key?: string,
  ): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < input.files.length; i++) {
      formData.append('files', input.files[i], input.files[i].name);
    }

    shift && formData.append('shift', shift.toString());
    key && formData.append('key', key);

    this.fileService
      .upload(formData, algorithm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.reportProgress(event, algorithm);
      });
  }

  // onDownloadFiles(fileName: string): void {
  //   this.fileService
  //     .download(fileName)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe((event) => {
  //       console.log(event);
  //       this.reportProgress(event);
  //     });
  // }

  private reportProgress(
    httpEvent: HttpEvent<Response | Blob>,
    algorithm: Algorithm,
  ): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStauts(httpEvent.loaded, httpEvent.total!, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStauts(httpEvent.loaded, httpEvent.total!, 'Downloading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const fileName of httpEvent.body) {
            this.fileNames.unshift(fileName);
          }
        } else {
          saveAs(
            new File(
              [httpEvent.body as Blob],
              httpEvent.headers.get('File-Name')!,
              {
                type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`,
              },
            ),
          );

          const encryptedText = (httpEvent.body as Response).encrypted_text;

          switch (algorithm) {
            case Algorithm.CAESEAR_CIPHER:
              this.caesarText = encryptedText;
              break;
            case Algorithm.CAESAR_CIPHER_POLYALPHABETIC:
              this.polyalphabeticText = encryptedText;
              break;
            case Algorithm.REPLACEMENT:
              this.replacementText = encryptedText;
              break;
            case Algorithm.COLUMN_TRANSPOSITION:
              this.columnTranspositionText = encryptedText;
              break;
          }
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log('httpEvent', httpEvent);
        break;
    }
  }

  private updateStauts(loaded: number, total: number, reqType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = reqType;
    this.fileStatus.percent = Math.round((loaded / total) * 100);
  }
}
