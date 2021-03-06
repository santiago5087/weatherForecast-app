import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../../services/weather.service';
import { Coordinate } from '../../models/coordinate';

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
  
  constructor(public weatherService: WeatherService) { 
    if (!(localStorage.getItem('coordinates') && localStorage.getItem('placeName'))) {
      // Valores por default
      localStorage.setItem('coordinates', '{"latitude":6.24475,"longitude":-75.57483}');
    }
    
    let coordinates: Coordinate = JSON.parse(localStorage.getItem('coordinates'));
    this.weatherService.getActualWeather(coordinates.latitude, coordinates.longitude);
  }
  
  ngOnInit(): void {
    this.subscription = this.weatherService.getWeather().subscribe(weather => { 
      this.currentWeather = weather.current;
      this.dailyWeather = weather.daily;
      this.hourlyWeather = [];
      
      for (let i=0; i < weather.hourly.length; i++) {
        if (i % 4 == 0) this.hourlyWeather.push(weather.hourly[i]);
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