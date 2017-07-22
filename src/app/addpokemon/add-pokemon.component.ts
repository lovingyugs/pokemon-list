import { Component } from '@angular/core';
import { AllServices } from '../_services/index';

@Component({
  templateUrl:"add-pokemon.component.html",
  styleUrls: ['../app.component.css']
})

export class AddPokemonComponent {

  user: any;
  constructor(private allServices: AllServices) {
    this.user = allServices.getUser();
  }

  Send(desc: string) {
    if(!desc){
      alert('Add a Pokemon');
    }
    else
    {
      this.allServices.save({ message: desc });

      // alert("Successfully added pokemon");
      // window.location.href = "/home";
    }
  }
}
