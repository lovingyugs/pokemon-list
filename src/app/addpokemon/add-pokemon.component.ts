import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { AllServices } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonType } from './pokemon-type.component';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: "add-pokemon.component.html",
  styleUrls: ['add-pokemon.component.css', '../app.component.css']
})

export class AddPokemonComponent implements OnInit {
  title: string;
  message: any;
  subscription: Subscription;
  user: any;
  item: any;
  rForm: FormGroup;
  titleAlert: string = 'This field is required';
  selectedType: PokemonType = new PokemonType(0, '');
  selectedNature: number;
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

  constructor(private allServices: AllServices, private route: ActivatedRoute, private fb: FormBuilder) {
    this.user = allServices.getUser();
    this.SortMap();
    this.selectedType.id = Math.floor(this.pokeTypes.length/2);
    this.selectedNature = 1;
    this.rForm = this.fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'pokeType': [this.selectedType.id],
      'pokeNature': this.selectedNature,
      'validate': ''
    });
    this.title = 'Add Product';
  }

  ngOnInit() {
    let pokeId = Number(this.route.snapshot.params['id']);
    if (pokeId>-1 && typeof(pokeId) === 'number' && pokeId !== undefined && !isNaN(pokeId)) {
        this.title = 'Edit Product';
        let pokemon = this.getById(pokeId);
        this.selectedType.id = this.getIdByTypeName(pokemon.type);
        this.selectedNature = Number(this.getIdByNature(pokemon.nature));
        this.rForm = this.fb.group({
          'name': [pokemon.name, Validators.required],
          'description': [pokemon.description, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
          'pokeType': [Number(this.selectedType.id)],
          'pokeNature': this.selectedNature,
          'validate': ''
        });
    }

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
    let item = {
      description: pokemon.description,
      name: (pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1),
      type: this.pokeTypes[parseInt(pokemon.pokeType) - 1].name,
      nature: this.pokeNatures[parseInt(pokemon.pokeNature) - 1].nature
    };
    this.allServices.save(item);
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
  }

  private getById(pokeId: number){
    let me=this.allServices.getPokemonById(pokeId);
    return me;
  }

  private getIdByNature(nature: string){
    let natureId = this.pokeNatures.find((eachNature: any) => {
      if(eachNature.nature === nature){
        return eachNature.id;
      }
    });
    return natureId.id;
  }

  private getIdByTypeName(typeName: string){
     let temp = this.pokeTypes;
     let returnId = Math.floor(temp.length/2);
     for(let i=0;i<temp.length;i++){
       if(temp[i].name === typeName){
         returnId = temp[i].id;
         break;
       }
     }
     return returnId;
  }
}
