import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { AllServices } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonType } from './pokemon-type.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: "add-pokemon.component.html",
  styleUrls: ['add-pokemon.component.css', '../app.component.css']
})

export class AddPokemonComponent implements OnInit, OnDestroy {
  message: any;
  subscription: Subscription;
  user: any;
  rForm: FormGroup;
  titleAlert: string = 'This field is required';
  selectedType: PokemonType = new PokemonType(0, '');
  pokeTypes = [
    new PokemonType(1, 'Fire'),
    new PokemonType(2, 'Grass'),
    new PokemonType(3, 'Water'),
    new PokemonType(4, 'Rock'),
    new PokemonType(5, 'Electric'),
    new PokemonType(6, 'Ghost'),
    new PokemonType(7, 'Ground'),
    new PokemonType(8, 'Ice'),
    new PokemonType(9, 'Flying'),
    new PokemonType(10, 'Psychic'),
    new PokemonType(11, 'Bug'),
    new PokemonType(12, 'Fairy'),
    new PokemonType(13, 'Fighting'),
    new PokemonType(14, 'Poison'),
    new PokemonType(14, 'Steel'),
    new PokemonType(14, 'Normal'),
    new PokemonType(14, 'Other')
  ];
  pokeNatures = [{
      id: 1,
      nature: 'Wild'
    },
    {
      id: 2,
      nature: 'Domestic'
    },
    {
      id: 3,
      nature: 'Other'
    },
  ];

  constructor(private allServices: AllServices, private fb: FormBuilder) {
    this.user = allServices.getUser();
    this.SortMap();
    this.rForm = this.fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'pokeType': [this.selectedType.id],
      'pokeNature': this.pokeNatures[0].id,
      'validate': ''
    });
    this.subscription = this.allServices.getMessage().subscribe(message => {
      this.message = message;
      console.log(this.message);
    });
    // console.log(this.subscription);
    //console.log(this.pokeTypes);
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1' || validate) {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'You need to specify at least 3 characters';
        } else {
          this.rForm.get('name').setValidators(Validators.required);
        }
        this.rForm.get('name').updateValueAndValidity();
      });
  }

  Send(desc: string) {
    if (!desc) {
      alert('Add a Pokemon');
    } else {
      this.allServices.save({ message: desc });
    }
  }

  addPokemon(pokemon) {
    console.log(pokemon);
    let item = {
      description: pokemon.description,
      name: (pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1),
      type: this.pokeTypes[parseInt(pokemon.pokeType) - 1].name,
      nature: this.pokeNatures[parseInt(pokemon.pokeNature) - 1].nature
    };
    this.allServices.save(item);
    console.log(item);
  }

  SortMap() {
    this.pokeTypes.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else
        return -1;
    });
    this.pokeTypes.map((item, index) => {
      item.id = index + 1;
    });
    this.selectedType.id = Math.floor(this.pokeTypes.length/2);
  }

  editPokemon(item){
    this.subscription = this.allServices.getMessage().subscribe(message => {
      this.message = message;
      console.log(message);
    });
    console.log(item);
  }

 ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
}
