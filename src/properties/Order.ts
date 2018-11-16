import { Item } from './Item';

export class Order {
    orderId: string;
    items: Array<Item>;
    check: string;
    countDown: string;

    mPath: number = 0;
    sPath: number = 0;
    interval;


  //초 분 함수
  public startTimer() {
    this.interval = setInterval(() => {
      if(this.sPath < 59) {
        this.sPath++;
      } else {
        this.mPath++;
        this.sPath = 0;
      }
    },1000)
  }
}
