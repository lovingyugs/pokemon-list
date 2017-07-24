import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AllServices{
  user: Observable < firebase.User > ;
  items: FirebaseListObservable < any[] > ;
  name: any;
  msgVal: string = '';
  private subject = new Subject<any>();

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    this.user = this.afAuth.authState;
  }

  // sendMessage(pokemon) {
  //   this.subject.next(pokemon);
  //   console.log(pokemon);
  // }

  sendMessage(message: string) {
    console.log(message);
      this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
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

  save(newPokemon) {
    this.items.push(newPokemon).then(_ => {
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
