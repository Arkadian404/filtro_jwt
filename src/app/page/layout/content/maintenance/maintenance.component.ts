import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit, OnDestroy{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  interval = null;


  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    const countDay = new Date('August 15, 2024 00:00:00').getTime();

    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const counter = countDay - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      this.days = Math.floor(counter / day);
      this.hours = Math.floor((counter % day) / hour);
      this.minutes = Math.floor((counter % hour) / minute);
      this.seconds = Math.floor((counter % minute) / second);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
