import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EliminarDocumentoPage } from './eliminar-documento';

@NgModule({
  declarations: [
    EliminarDocumentoPage,
  ],
  imports: [
    IonicPageModule.forChild(EliminarDocumentoPage),
  ],
})
export class EliminarDocumentoPageModule {}
