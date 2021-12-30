import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJitrComponent } from './components/add-jitr/add-jitr.component';
import { AdminComponent } from './components/admin/admin.component';
import { JitrDetailsComponent } from './components/jitr-details/jitr-details.component';
import { JitrListComponent } from './components/jitr-list/jitr-list.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: 'jitrs', component: JitrListComponent},
  {path: 'add-jitr', component: AddJitrComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: 'jitrs', pathMatch: 'full'},
  {path: 'jitr-details/:jitrNumber', component: JitrDetailsComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
