import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'terabulk-blog';

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.get(AppConstants.WP_URL + 'wp/v2/posts').subscribe(posts => {
      console.log(posts)
    })
  }
}
