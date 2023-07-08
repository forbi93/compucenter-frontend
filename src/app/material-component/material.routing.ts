import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {RouteGuardService} from "../services/route-guard.service";
import {ManageCustomerComponent} from "./manage-customer/manage-customer.component";
import {ManageTyperoomComponent} from "./manage-typeroom/manage-typeroom.component";
import {ManageRoomComponent} from "./manage-room/manage-room.component";
import {ManageReservationComponent} from "./manage-reservation/manage-reservation.component";
import {ViewReservationComponent} from "./view-reservation/view-reservation.component";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {ManageReservationRucComponent} from "./manage-reservation-ruc/manage-reservation-ruc.component";
import {ViewReservationRucComponent} from "./view-reservation-ruc/view-reservation-ruc.component";


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
  },
  {
    path:'typeroom',
    component:ManageTyperoomComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },
  {
    path:'room',
    component:ManageRoomComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },
  {
    path:'reservation',
    component:ManageReservationComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin','user']
    }
  },
  {
    path:'reservation-ruc',
    component:ManageReservationRucComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin','user']
    }
  },
  {
    path: 'reservation-view',
    component: ViewReservationComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  },
  {
    path: 'reservation-view-ruc',
    component: ViewReservationRucComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  },
  {
    path:'user',
    component:ManageUserComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  }
];
