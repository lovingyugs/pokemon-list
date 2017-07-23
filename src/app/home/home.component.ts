import { Component } from '@angular/core';
import { AllServices } from '../_services/';
import { AddPokemonComponent } from '../addpokemon/';

@Component({
  templateUrl:"home.component.html",
  styleUrls: ['home.component.css' ,'../app.component.css']
})

export class HomeComponent {
  items: any;
  name: any;

  constructor(private allServices: AllServices, private addPokemonComponent: AddPokemonComponent ) {
    console.log("in home cons");
    this.items = allServices.getAll();
  }

  removePokemon(item){
    console.log(item.message);
    this.allServices.delete(item);
  }

  editPokemon(){
    this.addPokemonComponent.editPokemon(this);
  }
}
