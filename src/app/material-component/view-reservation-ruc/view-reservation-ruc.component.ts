import { Component } from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {ViewReservationRoomsComponent} from "../dialog/view-reservation-rooms/view-reservation-rooms.component";
import {ConfirmationComponent} from "../dialog/confirmation/confirmation.component";
import {saveAs} from "file-saver";
import {
  ViewReservationRucRoomsComponent
} from "../dialog/view-reservation-ruc-rooms/view-reservation-ruc-rooms.component";

@Component({
  selector: 'app-view-sales-ruc',
  templateUrl: './view-reservation-ruc.component.html',
  styleUrls: ['./view-reservation-ruc.component.css']
})
export class ViewReservationRucComponent {

  displayedColumns: string[] = ['razSocial','ruc','dateCreated','address','paymentMethod','total','view'];
  dataSource: any;
  responseMessage:any;

  constructor(private reservationService:ReservationService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog,
              private snackbarService:SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }



  tableData(){
    this.reservationService.getReservationsRuc().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data:values
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ViewReservationRucRoomsComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete '+values.name + ' bill',
      confirmation:true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteReservation(values.id);
      dialogRef.close();
    })
  }

  deleteReservation(id:any){
    this.reservationService.deleteRuc(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  downloadReportAction(values:any){
    this.ngxService.start();
    var data = {
      uuid:values.uuid,
      razSocial: values.razSocial,
      ruc: values.ruc,
      dateCreated: values.dateCreated,
      address: values.address,
      paymentMethod:values.paymentMethod,
      date:values.date,
      totalAmount: values.total.toString(),
      roomDetails: values.roomDetail
    }
    this.downloadFile(values.uuid,data);
  }

  downloadFile(fileName:string,data:any){
    this.reservationService.getPdfRuc(data).subscribe((response)=>{
      saveAs(response,fileName+'.pdf');
      this.ngxService.stop();
    })
  }

}
