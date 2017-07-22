import { Component } from '@angular/core';
import { AllServices } from '../_services/index';


@Component({
  templateUrl:"home.component.html",
  styleUrls: ['../app.component.css']
})

export class HomeComponent {
  items: any;
  name: any;

  constructor(private allServices: AllServices) {
    console.log("in home cons");
    this.items = allServices.getAll();
  }

  removePokemon(item){
    console.log(item.message);
    this.allServices.delete(item);
  }
}
