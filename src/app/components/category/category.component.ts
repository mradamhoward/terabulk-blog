import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from 'src/app/constants/constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public slug:string = "";
  public category: any;
  posts:any[] = []
  public media: any[] = []

  constructor(private spinner: NgxSpinnerService,private title:Title, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.route.queryParams.subscribe(params =>{
    this.spinner.show()
    console.log(params['cat'])
    this.slug = params['id']
    this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/categories/' + this.slug).subscribe(cat => {
      this.category = cat
      console.log(cat);

      this.title.setTitle(this.category.name + ' - MajorBulk Blog')
    })

    this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/posts/?categories=' + this.slug).subscribe(posts => {
      this.posts = posts
      this.spinner.hide()
      this.getImgUrlMedia()
    })
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
