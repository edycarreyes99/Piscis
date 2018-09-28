import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EliminarTodoPage } from './eliminar-todo';

@NgModule({
  declarations: [
    EliminarTodoPage,
  ],
  imports: [
    IonicPageModule.forChild(EliminarTodoPage),
  ],
})
export class EliminarTodoPageModule {}
