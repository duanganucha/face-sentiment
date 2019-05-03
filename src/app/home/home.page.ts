import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router : Router){}

  onStart(){
    this.router.navigate(['/analysis']);
  }
  onHelp(){
    this.router.navigate(['/help']);
  }
  onServices(){
    this.router.navigate(['/services']);
  }
  onContact(){
    this.router.navigate(['/contact']);
  }

}
