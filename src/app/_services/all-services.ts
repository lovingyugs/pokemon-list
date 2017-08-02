import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AllServices{
  user: Observable < firebase.User > ;
  items: FirebaseListObservable < any[] > ;
  itemArray: any;
  name: any;
  subs: any;
  msgVal: string = '';
  totalItems: number;
  //private subject = new Subject<any>();

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.itemArray=[];
    this.items = af.list('/pokemons', {
      query: {
        limitToLast: 50
      }
    })
    this.subs= af.list('/pokemons',{

    }).subscribe(snapshot => {
      this.itemArray=snapshot;
      this.totalItems = snapshot.length;
    });
    this.user = this.afAuth.authState;
  }

  getAll() {
    return this.items;
  }

  getPokemonById(id: number){
      return this.itemArray.find(eachItem => eachItem.id === id);
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

  getLength = ()=> this.totalItems;

  save(newPokemon) {
    newPokemon.id = this.getLength();
    this.items.push(newPokemon).then(_ => {
      console.log('item Added Successfully!')
      alert("Pokemon Added Successfully! View it on Home")
      this.totalItems++;
    });
    this.msgVal = '';
  }

  delete(item){
    console.log(item);
    this.items.remove(item).then(_ => console.log('item deleted!'));
  }
}
