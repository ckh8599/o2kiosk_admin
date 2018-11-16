import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
