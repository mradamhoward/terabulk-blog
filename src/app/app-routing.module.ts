import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'post/:id', component: PostComponent},
  {path: '', component: PostsComponent, data: { title: 'Home'}},
  {path: 'category/:cat', component: CategoryComponent},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
