import { Component, OnInit } from '@angular/core';
import { DateService } from './services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'TODO';

  choice: string = 'today';


  constructor(public dateService: DateService) {

  }


  today() {
    this.dateService.setDateToday();
    this.dateService.date.subscribe(res => {
      console.log(res)
    })
  }


}
