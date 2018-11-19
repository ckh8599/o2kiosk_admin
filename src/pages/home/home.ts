import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    //웹소켓 오픈
    this.openWebsocket();
  }

  //WebSocket 오픈
  webSocket : WebSocket;
  openWebsocket(){
    this.webSocket  = new WebSocket("ws://110.45.199.181:8002/WS?token=MY_STORE&id=ADMIN");
    
    this.webSocket.onopen = function(message){
      console.log("===== OPEN =====");
    }

    this.webSocket.onclose = function(message){
      console.log("===== CLOSE =====");
    }

    this.webSocket.onerror = function(message){
      console.log("!!!!! Error !!!!!");
    }

    this.webSocket.onmessage = function(message){
      console.log("message : " + message.data);
    }
  }

}
