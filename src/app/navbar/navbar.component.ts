import { Component } from '@angular/core';
import { AllServices } from '../_services/index';


@Component({
  selector: 'navbar',
  templateUrl:"navbar.component.html",
  styleUrls: ['navbar.component.css','../app.component.css']
})

export class NavbarComponent {
  user:any;
  isCollapsed:boolean;

  constructor(private allServices: AllServices) {
    this.user = allServices.getUser();
    this.isCollapsed = true;
  }

  login() {
    this.allServices.login();
  }

  logout() {
    this.allServices.logout();
  }
}
