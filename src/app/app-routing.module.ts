import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { FileUploadPage } from './pages/file-upload/file-upload.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'file-upload',
    component: FileUploadPage,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
