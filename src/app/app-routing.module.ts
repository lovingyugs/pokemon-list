import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/index';
import { AddPokemonComponent } from './addpokemon/index'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent },
  { path: 'add', component:  AddPokemonComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routedComponents = [HomeComponent, AddPokemonComponent];
