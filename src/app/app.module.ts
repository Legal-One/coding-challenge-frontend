import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { logsByAgentComponent } from './logsByAgent/logsByAgent.component';
import { RouterModule, Routes } from '@angular/router';
import { logsByNumberComponent } from './logsByNumber/logsByNumber.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'agent/:id',
    component: logsByAgentComponent,
  },
  {
    path: 'call/:number',
    component: logsByNumberComponent,
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    logsByAgentComponent,
    logsByNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
