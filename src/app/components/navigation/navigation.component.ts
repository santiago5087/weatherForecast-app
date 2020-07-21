import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SearchService } from '../../services/search.service';
import { rejects } from 'assert';

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
  filteredOptions: string[] = [];

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
          this.filteredOptions = res.features.map(feature => feature.place_name);
          console.log(res);
          },
        err => console.log(err));
  }

  selectedOption($event) {
    console.log($event);
  }

}