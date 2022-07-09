import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from 'src/app/constants/constants';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post:any;
  media:any[] = [];

  constructor(private spinner: NgxSpinnerService,private title: Title, private http: HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let id = params['id']
      this.spinner.show()
      console.log("ID " + id)
      this.http.get<any>(AppConstants.WP_URL + 'wp/v2/posts/' + id).subscribe(post => {
        this.post = post;
        console.log(post)
        this.title.setTitle(this.post.title.rendered  + ' - TeraBulk Blog')
        this.getImgUrlMedia()
        this.spinner.hide()
      })
    })

  }

  getImgUrlMedia(){
    this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/media/').subscribe(media => {
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
