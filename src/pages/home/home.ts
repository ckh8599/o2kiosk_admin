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
    
    this.webSocket.onopen = function(event){
      console.log("["+ event.type +"] connected!");
    }

    this.webSocket.onclose = function(event){
      console.log("["+ event.type +"] disconnected!");
    }

    this.webSocket.onerror = function(event){
      console.log("["+ event.type +"]");
    }

    this.webSocket.onmessage = (event) => {
      console.log("["+ event.type +"] " + event.data);
      
      let data = JSON.parse(event.data);
      if(data.code == "0"){
        let type = data.param.type;
        let list = data.param.items;

        if(type == "ORDER"){
          this.items = new Array<Item>();
          for (let prod of list) {
            this.item = new Item();
            this.item.id = prod.id;
            this.item.title = prod.title;
            this.item.count = prod.count;
            this.item.price = prod.price;
            this.items.push(this.item);
          }
          
          this.order = new Order();
          this.order.orderId = this.makeOrderNum();
          this.order.items = this.items;
          this.order.check = "main-back";
          this.order.countDown = "";

          //시간초기화
          this.order.startTimer();
          
          //주문입력
          this.orderList.push(this.order);
            
          //알림 사운드
          this.playAudio();
        }
      }else{
        alert(data.msg);
        return;
      }
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

  //사운드
  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/audio/ddiding.wav";
    audio.load();
    audio.play();
  }
}
