import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment().locale('ru'));

  constructor() { }


  changeDate(date: Date) {
    const value = this.date.value.set({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    });
    this.date.next(value);
  }

  setDateToday() {
    this.date.next(moment().locale('ru'));
  }
}
