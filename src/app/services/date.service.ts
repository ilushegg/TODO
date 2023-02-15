import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment());

  constructor() { }


  changeDate(date: Date) {
    const value = this.date.value.set({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    });
    console.log(value)

    this.date.next(value);
    console.log(this.date)
  }

  setDateToday() {
    this.date.next(moment());
  }
}
