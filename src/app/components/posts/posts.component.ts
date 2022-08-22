import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {  NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from 'src/app/constants/constants';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: any[] =  []
  public media: any[] = []
  constructor(private spinner:NgxSpinnerService, private title: Title, private http: HttpClient) { }

  ngOnInit(): void {
    this.title.setTitle('Home - MajorBulk Blog ')
    this.spinner.show()
    this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/posts').subscribe(posts => {
      this.posts = posts
      this.spinner.hide()
      this.getImgUrlMedia()
    })
  }

  getImgUrlMedia(){
    this.http.get<any>(AppConstants.WP_URL + 'wp/v2/media/').subscribe(media => {
        console.log(media)
        this.media = media
    })
  }

  getImgLinkFromId(mediaId:string){
    for (let media of this.media){
      if(media.id == mediaId){
        return media.source_url
      }
    }
  }


}
