import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IappState, setSearch } from 'src/app/shared/store/search.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private store: Store<{app:IappState}>, private router : Router) { }
  searchTerm: string = '';

  searchMovies() {
    this.store.dispatch(setSearch({searchTerm: this.searchTerm}));
    this.router.navigate(['/search']);

    
  }
  
}
