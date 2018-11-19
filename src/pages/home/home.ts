import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Item } from '../../properties/Item';
import { Order } from '../../properties/Order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  item: Item;
  items: Array<Item>;

  order: Order;
  orderList: Array<Order>;

  constructor(public navCtrl: NavController) {
    //주문목록 초기화
    this.orderList = new Array<Order>();
    //주문번호 초기화
    this.orderNum = 0;
    
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

    this.webSocket.onmessage = (message) => {
      console.log("receive data : " + message.data);

      var list = JSON.parse(message.data);
      
      this.items = new Array<Item>();
      for (let data of list) {
        this.item = new Item();
        this.item.id = data.id;
        this.item.title = data.title;
        this.item.count = data.count;
        this.item.price = data.price;
        this.items.push(this.item);
      }

      this.order = new Order();
      this.order.orderId = this.makeOrderNum();
      this.order.items = this.items;
      this.order.check = "main-back";
      this.order.countDown = "";

      //시간초기화
      this.order.startTimer();

      this.orderList.push(this.order);
      
      //사운드
      this.playAudio();
    }
  }

  //주문번호 반환
  orderNum : number;
  makeOrderNum(){
    this.orderNum++;
    
    let num = this.orderNum + '';
    let ret = num.length == 4 ? num : new Array(4-num.length+1).join('0') + num;

    if(num == "9999"){
      this.orderNum = 0;
    }
    return ret;
  }

  //확인
  confirm(order){
    order.check = "side-back";
    clearInterval(order.interval);
    this.playAudio();
    console.log(order);
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/audio/ddiding.wav";
    audio.load();
    audio.play();
  }
}
