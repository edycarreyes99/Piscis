import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { Router, NavigationEnd } from "@angular/router";
declare var $: any;
interface UserData {
  userid: string;
  photoURL: string;
  Nombre: string;
  Apellido: string;
  Correo: string;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() cambiar = new EventEmitter();
  @Output() actualizar = new EventEmitter();

  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: string;

  // State for dropzone CSS toggling
  isHovering: boolean;

  //Se crea el usuario imaginario
  user: string = 'ereyes';

  userDoc: AngularFirestoreDocument<any>;
  userid: Observable<any>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public auth: AuthService,
    public router: Router,
    private afs: AngularFirestore
  ) {
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  ngOnInit() {
    
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `Profile Pictures/${this.user}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Foto de Perfil de la plataforma Piscis' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges()

    // The file's download URL
    this.task.downloadURL().subscribe(url => {
      this.downloadURL = url;
      //Se actualizan los datos del usuario
      this.auth.afAuth.auth.currentUser.updateProfile({
        displayName: '',
        photoURL: this.downloadURL
      });

      //se publican los datos actuales a firestore
      this.afs.collection('Piscis').doc('Users').collection('Administradores').doc(`${this.user}`).set({
        userid: this.auth.afAuth.auth.currentUser.uid,
        photoURL: this.downloadURL,
        Nombre: 'Edycar',
        Apellido: 'Reyes',
        Correo: this.auth.afAuth.auth.currentUser.email
      });
    });
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}