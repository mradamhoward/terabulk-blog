import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from 'src/app/constants/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query?:string;
  media?:any[] = [];
  posts:any[] = [];
  results:any[] = [];
  ids:string[] = []
  searchCompleted:boolean = false
  @ViewChild('title') titleElement!: ElementRef;
  constructor(private spinner: NgxSpinnerService,private title:Title, private route:ActivatedRoute, private http:HttpClient) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params =>{

      this.spinner.show()
      this.posts = []
      this.ids = []
      this.results = []
      this.query = params['q']
      this.title.setTitle(this.query + ' - MajorBulk Blog')
      setTimeout(() => {
        this.titleElement.nativeElement.scrollIntoView({behaviour: 'smooth', block: 'center'})
      }, 1000)

      this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/search?search=' +this.query).subscribe(results => {
        console.log(results);
        this.results = results;

        this.spinner.hide()


        for(let result of results){
          this.ids.push(result.id)
        }
        if(this.ids.length == 0){
          this.searchCompleted = true;
        }

        console.log(this.ids)
        if(this.ids.length > 0){
        this.http.get<any[]>(AppConstants.WP_URL +'wp/v2/posts?include=' + this.ids).subscribe(posts => {
          this.posts = posts;
          this.getImgUrlMedia()
        })
      }

      })



      // this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/posts/?categories=' + this.slug).subscribe(posts => {
      //   this.posts = posts
      //   this.getImgUrlMedia()
      // })
    })
  }

  getImgUrlMedia(){
    this.http.get<any>(AppConstants.WP_URL + 'wp/v2/media/').subscribe(media => {
        console.log(media)
        this.media = media
    })
  }

  getImgLinkFromId(mediaId:string){
    for (let media of this.media!){
      if(media.id == mediaId){
        return media.source_url
      }
    }
  }

}
