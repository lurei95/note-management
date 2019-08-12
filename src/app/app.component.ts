import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserObserver } from './services/authentication/userObserver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  sidebarExpanded = true;
  title = 'note-management';

  constructor(translate: TranslateService, userObserver: UserObserver) 
  {
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');

    userObserver.startObserving();
  }
}