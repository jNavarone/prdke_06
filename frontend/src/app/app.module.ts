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
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonListComponent } from './person-list/person-list.component';
import { ServiceProviderCreateComponent } from './serviceProvider-create/serviceProvider-create.component';
import { ServiceProviderEditComponent } from './serviceProvider-edit/serviceProvider-edit.component';
import {ServiceProviderListComponent} from "./serviceProvider-list/serviceProvider-list.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'createPerson', component: PersonCreateComponent},
  {path: 'listPerson', component: PersonListComponent},
  {path: 'editPerson/:id', component: PersonEditComponent},
  {path: 'createServiceProvider', component: ServiceProviderCreateComponent},
  {path: 'editServiceProvider', component: ServiceProviderEditComponent},
  {path: 'listServiceProvider', component: ServiceProviderListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonCreateComponent,
    DashboardComponent,
    PersonEditComponent,
    PersonListComponent,
    ServiceProviderCreateComponent,
    ServiceProviderEditComponent,
    ServiceProviderListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
