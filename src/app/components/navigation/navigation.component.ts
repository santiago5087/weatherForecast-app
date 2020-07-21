import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { Place } from '../../models/place';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  // locationName = new FormControl();
  // options: Observable<string[]>;
  myControl = new FormControl();
  subscription: Subscription;
  filteredOptions: Place[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.subscription = this.myControl.valueChanges
      .subscribe(value => this.search(value));
  }

  search(name: string): void {
    let filterName = name.toLowerCase();
    this.searchService.search(filterName)
      .subscribe(
        res => {
          this.filteredOptions = res.features.map(feature => {
            let featuredPlace: Place = {
              name: feature.place_name,
              lat: feature.center[1],
              long: feature.center[0]
            }

            return featuredPlace;
          });
          console.log(res);
          },
        err => console.log(err));
  }

  selectedOption() {
    let so: Place = this.filteredOptions.filter(place => place.name === this.myControl.value)[0];
    console.log("Selected option", so);
  }

}