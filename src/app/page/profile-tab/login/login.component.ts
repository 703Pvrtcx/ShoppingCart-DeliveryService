import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  login = {} as Login;

  constructor(private authDao: AuthenticationService,
    private router: Router, private share:SharedService) { }
    
  ngOnInit() {}
  logIn(email, password) {
    this.share.showLoading();
    this.authDao.SignIn(email.value, password.value)
      .then((res) => {
        this.share.hideLoading();
        this.router.navigate(['profile-tab']); 
      }).catch((error) => {
        window.alert(error.message);
      })
  }
  googlesignin()
  {
    this.authDao.GoogleAuth();
  }
  }
 


