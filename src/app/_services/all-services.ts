import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AllServices{
  user: Observable < firebase.User > ;
  items: FirebaseListObservable < any[] > ;
  name: any;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    this.user = this.afAuth.authState;
  }

  getAll() {
    return this.items;
  }

  getUser(){
    return this.user;
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  save(desc) {
    this.items.push(desc).then(_ => {
      console.log('item Added Successfully!')
      //window.location.href = "/home";
      alert("Pokemon Added Successfully!")
    });
    this.msgVal = '';
  }

  delete(item){
    console.log(item);
    this.items.remove(item).then(_ => console.log('item deleted!'));
  }
}
