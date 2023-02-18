import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
  }

  onValueChange(value: Date): void {
    this.dateService.changeDate(value);
  }


}
