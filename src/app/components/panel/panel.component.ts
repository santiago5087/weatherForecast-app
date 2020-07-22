import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  weatherInfo: any = undefined;
  subscription: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscription = this.weatherService.getWeather().subscribe(weather => { this.weatherInfo = weather; console.log("weather from panel!", this.weatherInfo) });
  }

}
