import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgDragDropModule } from 'ng-drag-drop';
import { AgmCoreModule } from '@agm/core';
import {HttpModule, JsonpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { UserListComponent } from './user-list/user-list.component';
import { ListResultsComponent } from './search/list-results/list-results.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '/', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: SearchComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'detail/:id', component: ItemDetailsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UserListComponent,
    ListResultsComponent,
    UserProfileComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    JsonpModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes), 
    NgDragDropModule.forRoot(), 
    AgmCoreModule.forRoot({
      apiKey: '<your api key here>',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
