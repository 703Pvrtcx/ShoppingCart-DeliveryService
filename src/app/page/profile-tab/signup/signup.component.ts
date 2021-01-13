import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { SharedService } from 'src/app/services/shared.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { AuthenticationService } from "./../../../services/authentication.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = {} as UserInfo;
  constructor(
    public authService: AuthenticationService,private asf: AngularFirestore,
    public router: Router, private addess: UserInfoService,
    private share:SharedService
  ) { }

  ngOnInit() {}
  signUp(email, password,  name){
    this.share.showLoading();
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      this.share.hideLoading();
      let userID = this.asf.createId();
      this.user.userID = firebase.auth().currentUser.uid.toString();
      this.user.name = name.value;
      this.user.email = email.value;
      this.addess.adduserAddress(this.user);
      this.router.navigate(['profile-tab']);
    }).catch((error) => {
      window.alert(error.message);
    })
}

}
