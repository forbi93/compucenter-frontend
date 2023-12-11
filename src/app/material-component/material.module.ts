import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { CustomerComponent } from './dialog/customer/customer.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageTyperoomComponent } from './manage-typeroom/manage-typeroom.component';
import { TyperoomComponent } from './dialog/typeroom/typeroom.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { RoomComponent } from './dialog/room/room.component';
import { ManageReservationComponent } from './manage-reservation/manage-reservation.component';
import { ViewReservationRoomsComponent } from './dialog/view-reservation-rooms/view-reservation-rooms.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageReservationRucComponent } from './manage-reservation-ruc/manage-reservation-ruc.component';
import { ViewReservationRucComponent } from './view-reservation-ruc/view-reservation-ruc.component';
import { ViewReservationRucRoomsComponent } from './dialog/view-reservation-ruc-rooms/view-reservation-ruc-rooms.component';
import {DateService} from "../services/date.service";
import {ProductComponent} from "./dialog/product/product.component";
import {ManageProductComponent} from "./manage-product/manage-product.component";
import {ManageSaleComponent} from "./manage-sale/manage-sale.component";
import { ViewSalesLatestComponent } from './dialog/view-sales-latest/view-sales-latest.component';
import {ViewSalesComponent} from "./view-sales/view-sales.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [DatePipe, DateService],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    CustomerComponent,
    ManageCustomerComponent,
    ManageTyperoomComponent,
    ManageProductComponent,
    TyperoomComponent,
    ProductComponent,
    ManageRoomComponent,
    RoomComponent,
    ManageReservationComponent,
    ViewReservationRoomsComponent,
    ManageUserComponent,
    ManageReservationRucComponent,
    ViewReservationRucComponent,
    ViewReservationRucRoomsComponent,
    ManageSaleComponent,
    ViewSalesLatestComponent,
    ViewSalesComponent
  ]
})
export class MaterialComponentsModule {}
