import { Component, OnInit } from '@angular/core';
import { DateService } from './services/date.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Taskly';

  choice: string = 'today';

  bgImages: string[] = [];

  logo = true;

  constructor(
    public dateService: DateService,
    public storageService: StorageService
  ) {
    this.bgImages.push('assets/images/night-bg.jpg');
    this.bgImages.push('assets/images/day-bg.jpg');
    this.bgImages.push('assets/images/blue-bg.jpg');
    this.bgImages.push('assets/images/green-bg.jpg');
    this.bgImages.push('assets/images/red-bg.jpg');
    this.bgImages.push('assets/images/purple-bg.jpg');
  }

  today() {
    this.dateService.setDateToday();
    this.dateService.date.subscribe((res) => {});
  }

  changeBg(img: string) {
    this.storageService.setCurrentImagePath(img);
  }

  collapse() {
    this.logo = !this.logo;
  }
}
