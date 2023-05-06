import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {RouteGuardService} from "../services/route-guard.service";
import {ManageCustomerComponent} from "./manage-customer/manage-customer.component";


export const MaterialRoutes: Routes = [
  {
    path:'category',
    component:ManageCategoryComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },
  {
    path:'customer',
    component:ManageCustomerComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  }
];
