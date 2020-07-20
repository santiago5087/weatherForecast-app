import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  accessToken = 'pk.eyJ1Ijoic2FudGlhZ281MDg3IiwiYSI6ImNrY3V5YW90cjJkNG8zNGxiNTVsdzJ0OG0ifQ.0-N8FuXB1KfkHwzYjJWKEQ';

  constructor(private http: HttpClient) { }

  search(name: string) {
    return this.http.get<any>(`${this.baseUrl + name}.json?types=place&access_token=${this.accessToken}`);
  }

}