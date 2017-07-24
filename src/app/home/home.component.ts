import { Component, OnDestroy } from '@angular/core';
import { AllServices } from '../_services/';

@Component({
  templateUrl:"home.component.html",
  styleUrls: ['home.component.css' ,'../app.component.css']
})

export class HomeComponent{
  items: any;
  name: any;
  message: any;

  constructor(private allServices: AllServices) {
    console.log("in home cons");
    this.items = allServices.getAll();
    // this.subscription = this.allServices.sendMessage(this);
  }

  removePokemon(item){
    console.log(item.message);
    this.allServices.delete(item);
  }

  // editPokemon(){
  //   this.allServices.sendMessage(this);
  //   // this.addPokemonComponent.editPokemon(this);
  // }

  // sendMessage(pokemon): void {
  //     // send message to subscribers via observable subject
  //     console.log(pokemon);
  //     console.log(this);
  //     window.location.href="/#/add";
  //     this.allServices.sendMessage(pokemon);
  // }

sendMessage(): void {
        // send message to subscribers via observable subject
        this.allServices.sendMessage('Message from Home Component to App Component!');
    }
}
