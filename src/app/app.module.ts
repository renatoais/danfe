import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { TopComponent } from './components/top/top.component';
import { PanelComponent } from './components/panel/panel.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { PoProgressModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    PanelComponent,
    BottomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
