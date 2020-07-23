import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  private baseUrlIcon = 'http://openweathermap.org/img/wn/';
  private appid = '19721b757935703546bc98b4bed29cf6';  

  constructor(private http: HttpClient) { }

  weather: Subject<any> = new Subject<any>();

  getActualWeather(lat: number, long: number) {
    this.http
      .get<any>(`${this.baseUrl}?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${this.appid}`)
      .subscribe(result => {
        let coordinates = JSON.stringify({ lat, long });
        localStorage.setItem('coordinates', coordinates);
        this.sendActualWeather(result);
      }, err => console.log(err));
  }

  getIconUrl(icon: string, size: string): string {
    return this.baseUrlIcon + icon + size + '.png';
  }

  getWeather(): Observable<any> {
    return this.weather.asObservable();
  }

  sendActualWeather(weather: any): void {
    this.weather.next(weather);
  }

}