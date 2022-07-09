import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SidebarOpenAnimation, SidebarCloseAnimation, AccountMenuOpenAnimation, AccountMenuCloseAnimation } from "./animations";
import { transition, trigger, useAnimation } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/constants';

import { Title } from '@angular/platform-browser';
const animationParams = {
  menuWidth: "200px",
  animationStyle: "1000ms ease",
  animationDuration: "150ms"
};

const animationParamsAccount = {
  animationStyle: "600ms ease",
  animationDuration: "40ms"
};


@Component({
  selector: 'terabulk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger("sideMenu", [
      transition(":enter", [
        useAnimation(SidebarOpenAnimation, {
          params: {
            ...animationParams
          }
        })
      ]),
      transition(":leave", [
        useAnimation(SidebarCloseAnimation, {
          params: {
            ...animationParams
          }
        })
      ])
    ])
  ,
  trigger("accountMenu", [
    transition(":enter", [
      useAnimation(AccountMenuOpenAnimation, {
        params: {
          ...animationParamsAccount
        }
      })
    ]),
    transition(":leave", [
      useAnimation(AccountMenuCloseAnimation, {
        params: {
          ...animationParamsAccount
        }
      })
    ])
  ])
]
})
export class NavbarComponent implements OnInit {
  private openCategoryMenus: number[] = [];
  public openMenu: boolean = false;
  public userMenu: boolean = false;
  public searchTerms: string[] = ["Metal", "Diggers", "Medical Devices", "Mechatronics", "Electrical", "Electronics", "Mechanics", "Mechanical", "Mecha", "Mecho", "Mechanics", "Mechanical", "Mecha", "Mecho", "Mechanics", "Mechanical", "Mecha", "Mecho"];
  public predictions: string[] = [];
  public showSearch: boolean = false;
  public searchQuery: string = "";
  public selectedPredictionIndex: number = 0;
  public savedSelectionPredictionIndex: number = 0;
  public cartCount!: Observable<number>;
  public showNotifications: boolean = false;
  public notificationsCount: number = 0;
  public notificationsObs?: Observable<any>;
  public notificationsList?: any[];
  public bubbleNotifications: boolean = false;
  public bubbleCart: boolean = false;
  public bubbleSideMenu: boolean = false;
  public mainCategories: string[] = [];
  public mainIndexes: number[] = []
  public isLoggedIn: boolean = false;
  public isLoggedInObs?: Observable<boolean>;
  public categories: any[] = []


  @ViewChild('notificationsRef') menuRefViewChild!: ElementRef;
  @ViewChild('accountRef') accountMenuRefViewChild!: ElementRef;
  @ViewChild('predictionsRef') predictionsRef!: ElementRef;

  profile?:any = {};

  @HostListener('document:mousedown', ['$event'])
  onClick(event:any) {
    try{
      if(!this.menuRefViewChild.nativeElement.contains(event.target) && this.showNotifications){
        this.showNotifications = false;
      }

    } catch(e){}
    try{
      if(!this.accountMenuRefViewChild.nativeElement.contains(event.target) && this.userMenu){
        this.userMenu = false;
      }
    } catch (e){}
    try{
      if(!this.predictionsRef.nativeElement.contains(event.target)){
        this.predictions = [];
        console.log('predictions')
      }

    } catch(e){}
    console.log(event.target)
  }


  constructor(private title: Title, private route: ActivatedRoute, private router: Router,  private http: HttpClient,) { }



  ngOnInit(): void {
    this.http.get<any[]>(AppConstants.WP_URL + 'wp/v2/categories').subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    })
  }




  countNotificationsSeen(notifications: any[]){
    let count = 0;
    for(let notification of notifications){
      if(!notification.seen){
        count++
      }
    }
    return count;
  }





  parseItem (item:any) {
    const [, stringPart= '', numberPart = 0] = /(^[a-zA-Z]*)(\d*)$/.exec(item) || [];
    return [stringPart, numberPart];
  }

  sort (array:Array<string>) {
    const sorted = array.sort((a:string, b:string) => {
      return a.toString().localeCompare(b, undefined, {
         numeric: true,
         sensitivity: 'base'
      })
   })
   return sorted;
  }

  sortIdProperty (list:any) {
    const sorted = list.sort((a:any, b:any) => {
      return a.id.toString().localeCompare(b.id, undefined, {
         numeric: true,
         sensitivity: 'base'
      })
   })
   return sorted;
  }



  bubbleNotificationsTrigger(){
    this.bubbleNotifications = true;
    setTimeout(() => {
      this.bubbleNotifications = false;
    }, 600);

  }

  bubbleCartTrigger(){
    this.bubbleCart = true;
    setTimeout(() => {
      this.bubbleCart = false;
    }, 600);
  }

  bubbleSideMenuTrigger(){
    this.bubbleSideMenu = true;
    setTimeout(() => {
      this.bubbleSideMenu = false;
    }, 600);

  }

  toggleCategoryMenu(id: number){
    console.log("toggle")
    let isIDInMenu: boolean = false;
    for(let i = 0; i < this.openCategoryMenus.length; i++){
      if(this.openCategoryMenus[i] == id){
        this.openCategoryMenus.splice(i);
        isIDInMenu = true;
        console.log(this.openCategoryMenus)
      }
    }

    if(!isIDInMenu){
      this.openCategoryMenus.push(id);
    }

  }

  isCategoryMenuOpen(id: number){
    for(let i = 0; i < this.openCategoryMenus.length; i++){
      if (this.openCategoryMenus[i] == id){
        return true
      }
    }
    return false;
  }

  openMenuClicked(){
    console.log('clikedS')
    this.openMenu = !this.openMenu;
    this.closeUserMenu()
  }

  toggleUserMenu(){
    this.userMenu = !this.userMenu;
  }

  matchPredictions($event:any){
    let query:string = $event.target.value;
    console.log("Match predictions "+ query.length)
    this.predictions = []

    if(query.length > 2){
      console.log(true)
      this.matchArray(query)
    }
    console.log(this.predictions)
  }


  refreshProfileLocalStorage(){
    this.profile = JSON.parse(localStorage.getItem('profile')!);
  }


  matchArray(query:string){
    for(let s of this.searchTerms){
      if(s.toLowerCase().match(query.toLowerCase().trim())){
        console.log("matched "  +s.toLowerCase().match(query.toLowerCase().trim()))
        this.predictions.push(s);
      }
    }
  }

  toggleShowSearch(){
    this.showSearch = !this.showSearch;
  }

  search(){
    console.log(this.searchQuery)
     this.router.navigate(['search'], { queryParams:{ q:  this.searchQuery } })

    this.showSearch = false;
  }

  closeSideMenu(){
    this.openMenu = false;
  }



  closePredictions(s:string){
    this.searchQuery = s
    this.predictions = []
    this.showSearch = false;
  }

  downArrow(){
    if(this.selectedPredictionIndex < (this.predictions.length - 1)){
      this.selectedPredictionIndex++;
      console.log(this.selectedPredictionIndex)
    }

  }

  upArrow(){

    if(this.selectedPredictionIndex > 0){
      this.selectedPredictionIndex--;
      console.log(this.selectedPredictionIndex)
    }



  }

  searchSelectedPrediction(){
    if(this.selectedPredictionIndex >= 0 && this.predictions.length >= 1){
      console.log(this.predictions[this.selectedPredictionIndex])
      if(!(this.searchQuery == "")){
        this.router.navigate(['search'], { queryParams:{ q: this.predictions[this.selectedPredictionIndex]} })
        this.searchQuery = this.predictions[this.selectedPredictionIndex]
        this.predictions = []
        this.showSearch = false;

      }
    } else {
    if(!(this.searchQuery == "")){
      this.router.navigate(['search'], { queryParams:{ q: this.searchQuery } })
      this.predictions = []
      this.showSearch = false;
    }
    this.selectedPredictionIndex = -1
  }
  }

  backspacePressed(){
    this.selectedPredictionIndex = 0;
  }

  hoverPredictionStart(){
    this.savedSelectionPredictionIndex = this.selectedPredictionIndex;
    this.selectedPredictionIndex = -1;
  }

  hoverPredictionEnd(){
    this.selectedPredictionIndex = this.savedSelectionPredictionIndex;
  }

  goHome(){
    this.router.navigate(['/'])
  }

  closeUserMenu(){
    this.userMenu = false;
  }

  mouseEnterUserMenu(){

  }

  toggleNotifications(){
    this.showNotifications = !this.showNotifications;
    if(this.showNotifications){
      for(let notification of this.notificationsList!){
        notification.seen = true;
      }
      this.notificationsCount = 0

    }
  }
}
