import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {StorageService} from './_services/storage.service';
import {HelperService} from './_services/helper.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    StorageService,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
