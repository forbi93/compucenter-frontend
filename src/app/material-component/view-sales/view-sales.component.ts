import {Component, OnInit} from '@angular/core';
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
import {SaleService} from "../../services/sale.service";
import {ViewSalesLatestComponent} from "../dialog/view-sales-latest/view-sales-latest.component";
import {DateService} from "../../services/date.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})
export class ViewSalesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'telefono', 'correo', 'fechaCreacion', 'total', 'view'];
  dataSource: any;
  responseMessage: any;
  dateService: DateService;

  constructor(private saleService: SaleService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService,
              private router: Router,
              private _dateService: DateService,
              private customerService: CustomerService) {
    this.dateService = this._dateService
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    console.log(this.dataSource)
  }

  // tableData() {
  //   this.saleService.getSales().subscribe((response: any) => {
  //     this.ngxService.stop();
  //
  //     // Mapear cada venta y obtener la información del cliente
  //     const mappedData = response.map(async (sale: any) => {
  //       const customerInfo = await this.customerService.getCustomerById(sale.clienteId).toPromise();
  //       return {
  //         ...sale,
  //         nombre: customerInfo?.,
  //         telefono: customerInfo?.telefono,
  //         correo: customerInfo?.correo
  //       };
  //     });
  //
  //     // Utilizar Promise.all para esperar todas las llamadas a getCustomerById
  //     Promise.all(mappedData).then((updatedData) => {
  //       this.dataSource = new MatTableDataSource(updatedData);
  //     });
  //   }, (error: any) => {
  //     this.ngxService.stop();
  //     console.log(error);
  //     // ... manejo de errores
  //   });
  // }


  tableData() {

    this.saleService.getSales().subscribe((response: any) => {
      this.ngxService.stop();

      // Mapear cada venta y obtener la información del cliente
      const mappedData = response.map(async (sale: any) => {
        const customerInfo: any = await this.customerService.getCustomerById(sale.clienteId).toPromise();
        return {
          ...sale,
          nombreCliente: customerInfo?.nombre,
          telefonoCliente: customerInfo?.telefono,
          correoCliente: customerInfo?.correo
        };
      });

      // Utilizar Promise.all para esperar todas las llamadas a getCustomerById
      Promise.all(mappedData).then((updatedData) => {
        this.dataSource = new MatTableDataSource(updatedData);
      });


      // this.dataSource = new MatTableDataSource(response);
      // console.log(this.dataSource)
      //
      // const idCliente = this.dataSource.filteredData;
      //
      // this.customerService.getCustomerById(idCliente).subscribe((response: any) => {
      //   this.telefonoCliente = response.telefono;
      //   this.correoCliente = response.correo;
      //   this.nombreCliente = response.nombre;
      // })
      //
      // console.log(idCliente)

    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ViewSalesLatestComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'eliminar este registro',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteReservation(values.idVenta);
      dialogRef.close();
    })
  }

  deleteReservation(id: any) {
    this.saleService.delete(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  // downloadReportAction(values:any){
  //   this.ngxService.start();
  //   var data = {
  //     name: values.name,
  //     email:values.email,
  //     uuid:values.uuid,
  //     contactNumber:values.contactNumber,
  //     paymentMethod:values.paymentMethod,
  //     date:values.date,
  //     totalAmount: values.total.toString(),
  //     roomDetails: values.roomDetail
  //   }
  //   this.downloadFile(values.uuid,data);
  // }

  // downloadFile(fileName:string,data:any){
  //   this.reservationService.getPdf(data).subscribe((response)=>{
  //     saveAs(response,fileName+'.pdf');
  //     this.ngxService.stop();
  //   })
  // }

}
