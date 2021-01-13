import { Component, OnInit ,ViewChild, ElementRef  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { CartService } from 'src/app/services/cart.service';
import { MapboxService } from 'src/app/services/mapbox.service';
import { UserAddressService } from 'src/app/services/user-address.service';
import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.component.html',
  styleUrls: ['./saved-address.component.scss'],
})
export class SavedAddressComponent implements OnInit {


  public now: any = (new Date()).toISOString();
  user = {} as UserInfo;
  order = {} as UserOrder;

  cartl = [];
  addlocation: boolean;
  selected: boolean;
  checkAddress ="";
   bookList= []; 
   myBookList=[];
 
   addressUser: any;
   
   @ViewChild('cart', {static: false, read: ElementRef}) fab: ElementRef;
   constructor(private asf: AngularFirestore,
     public router: Router,
      private address: UserAddressService,
      private cart: CartService, 
  ) { }

     ngOnInit() 
     {
      this.cartl = this.cart.getCart();
       this.getMyBooks();
     }
     getMyBooks(){
    
      let userID = firebase.auth().currentUser.uid.toString();
      this.address.getUserAddress(userID).subscribe(data => {
  
        this.myBookList = data.map(e => {
          return{
            key: e.payload.doc.id,
            ... e.payload.doc.data() as UserInfo
          } as UserInfo
        })
      });
    }
  selectAddress(_address){
         this.order.address  = _address.name;
         window.alert(this.order.address);
    }
    delete(key){
      this.order.address  = key.name;
      window.alert(this.order.address);
      this.asf.collection('UserAddress').doc(key.key).delete().then(()=>{
        alert("deleted");
      })
    }
 
 }
 

