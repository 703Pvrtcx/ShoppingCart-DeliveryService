import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  selectedSegment = 'login';
  loggedIn: boolean;

  addlocation: boolean;
  selected: boolean;
  
  checkAddress ="";
 
delivery = false;
collect = true;
coordinates : any;
list : any;
selectedAddress : string= "";
lat;
lng;


addresses = [];

public now: any = (new Date()).toISOString();
user = {} as UserInfo;
@ViewChild('cart', {static: false, read: ElementRef}) fab: ElementRef;
  constructor(public popoverController: PopoverController,
    private auth: AngularFireAuth, 
    public router: Router,) {  
      
      this.auth.authState.subscribe(user => {
        if (user) {
          this.loggedIn = true;
          this.selectedSegment = 'myprofile';
         } else {
          this.loggedIn = false;
        }
      }) 
  }
  ngOnInit() {
    if(this.loggedIn) {
      this.selectedSegment = 'address';
      this.addlocation = false;
      this.selected = false;
    }
    this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
       } else {
        this.loggedIn = false;
        this.selectedSegment = 'myprofile';
      }
    }) 
  }
 addaddress() {
    this.router.navigateByUrl("sidemenu/tabs/contact");
  }
  logout(){
    this.auth.signOut();
  }
  segmentChanged($event){
    this.selectedSegment = $event.detail.value;
  }
}