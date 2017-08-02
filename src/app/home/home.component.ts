import { Component } from '@angular/core';
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
    this.items = allServices.getAll();
  }

  removePokemon(item){
    console.log(item.message);
    this.allServices.delete(item);
  }
}
