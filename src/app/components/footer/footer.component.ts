import { PlatformLocation } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'terabulk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public selectLang:boolean = false;

  public langs: string[] = ['EN', 'ZH', 'RU', 'DE', 'GA', 'ES'];
  public flags: string[] = ['assets/png-256/ireland-256x256-32996.png', 'assets/png-256/china-256x256-32942.png', 'assets/png-256/russia-256x256-33064.png', 'assets/png-256/germany-256x256-32989.png', 'assets/png-256/ireland-256x256-32996.png','assets/png-256/spain-256x256-33105.png'];
  public currentFlag: string = "assets/png-256/ireland-256x256-32996.png";
  public countryRoutes: string[] = [];

  constructor(platformLocation: PlatformLocation,@Inject(Location) private readonly location: Location, private router: Router ) {
    console.log();
    let baseHref = (platformLocation as any).location.pathname;
    let folder;
    let afterFolder;
    router.events.subscribe((val) => {
      const pathAfterDomainName = this.location.path();
      folder = baseHref.substring(1, 3);
      afterFolder = pathAfterDomainName
      this.countryRoutes = []
      for(let folderUpper of this.langs){
        this.countryRoutes.push('/' + folderUpper.toLowerCase() + afterFolder)
      }
      switch(folder){
        case this.langs[0].toLowerCase(): {
          this.currentFlag = this.flags[0]
          this.countryRoutes.push()
          break;
        }
        case this.langs[1].toLowerCase(): {
          this.currentFlag = this.flags[1]
          break;
        }
        case this.langs[2].toLowerCase(): {
          this.currentFlag = this.flags[2]
          break;
        }
        case this.langs[3].toLowerCase(): {
          this.currentFlag = this.flags[3]
          break;
        }
        case this.langs[4].toLowerCase(): {
          this.currentFlag = this.flags[4]
          break;
        }
        case this.langs[5].toLowerCase(): {
          this.currentFlag = this.flags[5]
          break;
        }
      }
      console.log('af ' + afterFolder);
      console.log('f ' + folder);
    });

  }

  ngOnInit(): void {
  }

  selectLangShow(){
    this.selectLang = !this.selectLang;
  }

  setLang(lang: number){
    console.log('test');

  }
  gohome(){
    window.location.href = 'https://firebulk.com'
  }
}
