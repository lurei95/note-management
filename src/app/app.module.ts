import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'
import { reducers } from './redux/reducers/index';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { HeaderBarItemComponent } from './components/header-bar-item/header-bar-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    HeaderBarComponent,
    HeaderBarItemComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}