import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layout/full/full.component';
import {RouteGuardService} from "./services/route-guard.service";
import {CustomerComponent} from "./material-component/dialog/customer/customer.component";

const routes: Routes = [
  { path: '', component: CustomerComponent },
  {
    path: 'compucenter',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'null',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        // canActivate:[RouteGuardService],
        // data:{
        //   expectedRole:['admin','user']
        // }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate:[RouteGuardService],
        // data: {
        //   expectedRole: ['admin', 'user']
        // }
      }
    ]
  },
  { path: '**', component: CustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
