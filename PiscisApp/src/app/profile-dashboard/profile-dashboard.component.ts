import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
declare var uploadcare: any;

@Component({
  selector: 'app-profile-dashboard',
  //templateUrl: './builded/examples/dashboard.html',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
public uuid: string;
  constructor(
    public http:Http
  ) { }

  ngOnInit() {

  }
  uploadFile(event) {
  	let elem = event.target;
  	if(elem.files.length > 0) {
  		console.log(elem.files[0]);
  		let formData = new FormData();
  		formData.append('file', elem.files[0]);

  		this.http.post('https://firebasestorage.googleapis.com/v0/b/proyecto-robotica-35bed.appspot.com/o/uploadProfile.php?alt=media&token=757ad030-177e-444a-8071-9fef94827ec6', formData)
  		.subscribe((data) => {

  			let jsonResponse = data.json();

  			this.gotSomeDataFromTheBackend(jsonResponse.file);
  			console.log('Got some data from backend ', data);
  		}, (error) => {
  			console.log('Error! ', error);
  		});
  	}
  }
  gotSomeDataFromTheBackend(uuid: string) {
    this.uuid = uuid;
}
showCropper(){
  uploadcare.openDialog(null, {
    publicKey: '420d8a2ee1d9d190d223',
    imagesOnly: true,
    crop: '300x200'
  });
}
}
