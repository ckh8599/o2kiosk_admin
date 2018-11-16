import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Item } from '../../properties/Item';
import { Order } from '../../properties/Order';
import { CdTimerModule } from 'angular-cd-timer';

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

    this.items = new Array<Item>();
    this.orderList = new Array<Order>();

    this.item = new Item();
    this.item.id = "1";
    this.item.title = "아메리카노";
    this.item.count = 2;
    this.item.price = 3000;
    
    this.items.push(this.item);

    this.item = new Item();
    this.item.id = "2";
    this.item.title = "카라멜마키아또";
    this.item.count = 1;
    this.item.price = 4000;
    
    this.items.push(this.item);


    this.order = new Order();
    this.order.orderId = "5461";
    this.order.items = this.items;
    this.order.check = "main-back";
    this.order.countDown = "";

    this.orderList.push(this.order);


    this.items = new Array<Item>();
    this.item = new Item();
    this.item.id = "2";
    this.item.title = "카라멜마키아또";
    this.item.count = 7;
    this.item.price = 4000;
    
    this.items.push(this.item);


    this.order = new Order();
    this.order.orderId = "6541";
    this.order.items = this.items;
    this.order.check = "main-back";
    this.order.countDown = "";

    this.orderList.push(this.order);

    console.log(this.orderList);

  }

  confirm(order){
    order.check = "side-back";
    console.log(order);
  }

}
