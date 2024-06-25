import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonCreateComponent } from './person-create/person-create.component';
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {ServiceProviderEditComponent} from "./serviceProvider-edit/serviceProvider-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // default route
  { path: 'createPerson', component: PersonCreateComponent },
  { path: 'listPerson', component: PersonListComponent },
  { path: 'editPerson/:id', component: PersonEditComponent},
  { path: 'editProvider/:id', component: ServiceProviderEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
