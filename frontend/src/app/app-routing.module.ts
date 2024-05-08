import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonCreateComponent } from './person-create/person-create.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // default route
  { path: 'createPerson', component: PersonCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
