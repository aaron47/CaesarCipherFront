import { Component, DestroyRef } from '@angular/core';
import { FileService } from '../../services/file.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Response } from '../../utils/types/response';
import { saveAs } from 'file-saver';
import { Algorithm } from '../../utils/types/algorithm';

type FileStatus = {
  status: string;
  requestType: string;
  percent: number;
};

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.page.html',
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

  constructor(
    private readonly fileService: FileService,
    private readonly destroyRef: DestroyRef,
  ) {}

  onUploadFiles(event: Event, algorithm: Algorithm): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < input.files.length; i++) {
      formData.append('files', input.files[i], input.files[i].name);
    }

    this.fileService
      .upload(formData, algorithm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        console.log(event);
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

          switch (algorithm) {
            case Algorithm.CAESEAR_CIPHER:
              this.caesarText = (httpEvent.body as Response).encrypted_text;
              break;
            case Algorithm.CAESAR_CIPHER_POLYALPHABETIC:
              this.polyalphabeticText = (
                httpEvent.body as Response
              ).encrypted_text;
              break;
            case Algorithm.REPLACEMENT:
              this.replacementText = (
                httpEvent.body as Response
              ).encrypted_text;
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
    console.log(this.fileStatus.percent);
  }
}
