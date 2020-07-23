import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../../services/weather.service';
import { Place } from '../../models/place';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  currentWeather: any = undefined;
  dailyWeather: any[] = [];
  hourlyWeather: any[] = [];
  
  constructor(public weatherService: WeatherService) { }
  
  ngOnInit(): void {
    this.subscription = this.weatherService.getWeather().subscribe(weather => { 
      this.currentWeather = weather.current;
      this.dailyWeather = weather.daily;
      this.hourlyWeather = [];
      
      for (let i=0; i < weather.hourly.length; i++) {
        if (i % 4 == 0) this.hourlyWeather.push(weather.hourly[i]);
      } 
      
      if (localStorage.getItem('coordinates')) {
        let place: Place = JSON.parse(localStorage.getItem('coordinates'));
        this.weatherService.getActualWeather(place.lat, place.long); 
      }
    });

  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  unixToDate(unixTime: number): Date {
    return new Date(unixTime * 1000);
  }
}