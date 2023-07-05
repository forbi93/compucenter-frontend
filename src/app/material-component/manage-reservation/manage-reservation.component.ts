import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {RoomComponent} from "../dialog/room/room.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TyperoomService} from "../../services/typeroom.service";
import {ReservationService} from "../../services/reservation.service";

import {saveAs} from "file-saver";
import {
    MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'
import {registerLocaleData} from "@angular/common";
import localeES from '@angular/common/locales/es'

registerLocaleData(localeES, 'es');

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-manage-reservation',
  templateUrl: './manage-reservation.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
  styleUrls: ['./manage-reservation.component.css']
})
export class ManageReservationComponent implements OnInit{

  displayedColumns: string[] = ['name','typeRoom','price','quantity','total','date','edit'];
  dataSource:any = [];
  manageReservationForm:any = FormGroup;
  typeRooms:any = [];
  rooms: any = [];
  price: any;
  totalAmount: number=0;
  responseMessage:any;

  constructor(private formBuilder: FormBuilder,
              private typeRoomService:TyperoomService,
              private roomService:RoomService,
              private reservationService: ReservationService,
              private ngxService:NgxUiLoaderService,
              private dialog:MatDialog,
              private snackbarService:SnackbarService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.getTypeRooms();
    this.manageReservationForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required]],
      contactNumber:[null,[Validators.required]],
      paymentMethod:[null,[Validators.required]],
      room:[null,[Validators.required]],
      typeRoom:[null,[Validators.required]],
      quantity:[null,[Validators.required]],
      price:[null,[Validators.required]],
      date:[null,[Validators.required]],
      total:[null,[Validators.required]],
    })

  }

  getTypeRooms(){
    this.typeRoomService.getFilteredTypeRoom().subscribe((response:any)=>{
      this.ngxService.stop();
      this.typeRooms = response;
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getRoomsByTypeRoom(value: any){
    this.roomService.getRoomByTypeRoom(value.id).subscribe((response:any)=>{
      this.rooms = response;
      this.manageReservationForm.controls['price'].setValue('');
      this.manageReservationForm.controls['quantity'].setValue('');
      this.manageReservationForm.controls['total'].setValue(0);
    },(error:any)=>{
      console.log(error);
      if (error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getRoomDetails(value:any){
    this.roomService.getById(value.id).subscribe((response:any)=>{
      this.price = response.price;
      this.manageReservationForm.controls['price'].setValue(response.price);
      this.manageReservationForm.controls['quantity'].setValue('1');
      this.manageReservationForm.controls['total'].setValue(this.price * 1);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  setQuantity(value:any){
    var temp = this.manageReservationForm.controls['quantity'].value;
    if (temp > 0){
      this.manageReservationForm.controls['total'].setValue(this.manageReservationForm.controls['quantity'].value * this.manageReservationForm.controls['price'].value)
    }
    else if(temp != ''){
      this.manageReservationForm.controls['quantity'].setValue('1');
      this.manageReservationForm.controls['total'].setValue(this.manageReservationForm.controls['quantity'].value *
      this.manageReservationForm.controls['price'].value);
    }
  }

  validateRoomAdd(){
    if (this.manageReservationForm.controls['total'].value === 0 || this.manageReservationForm.controls['total'].value === null ||
      this.manageReservationForm.controls['quantity'].value <= 0){
      return true;
    }
    else
      return false;
  }

  validateSubmit(){
    if (this.totalAmount === 0 || this.manageReservationForm.controls['name'].value === null ||
      this.manageReservationForm.controls['email'].value === null ||
      this.manageReservationForm.controls['contactNumber'].value === null ||
      this.manageReservationForm.controls['paymentMethod'].value === null){
      return true;
    }
    else
      return false;
  }

  add(){
    var testing = this.manageReservationForm.get('date').value.format('LL')
    var formData = this.manageReservationForm.value;
    var roomName = this.dataSource.find((e: {id:number}) => e.id === formData.room.id);
    if (roomName === undefined){
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id:formData.room.id,
        name:formData.room.name,
        typeRoom:formData.typeRoom.name,
        quantity:formData.quantity,
        price:formData.price,
        date:testing,
        total:formData.total,

      })
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.roomAdded,"success");
    }
    else {
      this.snackbarService.openSnackBar(GlobalConstants.roomExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(value:any,element:any){
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value,1);
    this.dataSource = [...this.dataSource];
  }

  submitAction(){
    var formData = this.manageReservationForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      date:formData.date,
      totalAmount: this.totalAmount.toString(),
      roomDetails: JSON.stringify(this.dataSource)
    }

    this.ngxService.start();
    this.reservationService.generateReport(data).subscribe((response:any)=>{
      this.downloadFile(response?.uuid);
      this.manageReservationForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    },(error:any)=>{
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  downloadFile(fileName: string){
    var data = {
      uuid: fileName
    }

    this.reservationService.getPdf(data).subscribe((response:any)=>{
      saveAs(response, fileName + '.pdf');
      this.ngxService.stop();
    })
  }


}
