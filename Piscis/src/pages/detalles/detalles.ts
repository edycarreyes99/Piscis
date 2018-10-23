import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from "angularfire2/firestore";

export interface historialDocumentos {
  private_key_id: string,
  ano: number,
  mes: string,
  fecha: string,
  dia: number,
  hora: number,
  minutos: number,
  segundos: number,
  tiempo: string,
  temperatura: number,
  humedad: number,
  nivel_agua: number,
  nivel_purificacion: number,
  oxigeno: number,
  ph: number,
  turbidad: number,
  viscosidad: number
}
/**
 * Generated class for the DetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {
  documento: historialDocumentos;
  constructor(public navCtrl: NavController, public fs: AngularFirestore, public navParams: NavParams, public alert: AlertController) {
    this.documento = navParams.get('documento');
  }
  eliminarDocumento() {
    const alert = this.alert.create({
      title: 'Eliminar Documento',
      subTitle: `${this.documento.private_key_id}`,
      message: '¿Estas seguro que deseas eliminar este documento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.fs.doc(`Piscis/Historial/Sensores/${this.documento.private_key_id}`).delete().then((value) => {
              this.navCtrl.pop().then((done) => {
                const alert2 = this.alert.create({
                  title: 'Documento Eliminado',
                  message: 'El documento se ha eliminado correctamente',
                  buttons: [
                    {
                      text: 'Aceptar'
                    }
                  ]
                });
                alert2.present();
              });
            }).catch((e) => {
              const alertError = this.alert.create({
                title: 'Error',
                message: e,
                buttons: [
                  {
                    text: 'Aceptar'
                  }
                ]
              });
              alertError.present();
            });
          }
        },
      ]
    })
    alert.present();
    //this.fs.doc(`Piscis/Historial/Sensores/${documento.private_key_id}`).delete();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesPage');
  }

}
