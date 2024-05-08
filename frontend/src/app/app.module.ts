import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersonCreateComponent } from './person-create/person-create.component';
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'createPerson', component: PersonCreateComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent,
    PersonCreateComponent,
    //DashboardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,

  ],
  providers: [
    DatePipe
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
