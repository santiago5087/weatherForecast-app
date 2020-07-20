import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  locationName: string = "";

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  search(event: KeyboardEvent): void {
    this.searchService.search(this.locationName)
      .subscribe(
        res => console.log(res), 
        err => console.log(err));
  }


}
