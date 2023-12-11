import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {GlobalConstants} from "../../shared/global-constants";
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
import {ProductService} from "../../services/product.service";
import {SaleService} from "../../services/sale.service";

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
  templateUrl: './manage-sale.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
  styleUrls: ['./manage-sale.component.css']
})
export class ManageSaleComponent implements OnInit {

  displayedColumns: string[] = ['producto', 'descripcionProduct', 'precio', 'cantidad', 'subtotal', 'edit'];
  dataSource: any = [];
  manageSaleForm: any = FormGroup;
  typeRooms: any = [];
  products: any = [];
  price: any;
  totalVenta: number = 0;
  responseMessage: any;
  precioUnitario: any;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private saleService: SaleService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.testMethod();
    this.manageSaleForm = this.formBuilder.group({
      idCliente: [null, [Validators.required]],
      producto: [null, [Validators.required]],
      precioUnitario: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      subtotal: [null, [Validators.required]],

      // // Detalles de ventas (en caso de que quieras manejar más de un detalle de venta)
      // detalleVentas: this.formBuilder.array([]),
    });

  }

  testMethod(){
    this.productService.getProducts().subscribe((response:any)=>{
      this.ngxService.stop();
      this.products = response;
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

  getProducts(value: any) {
    console.log(value);
    this.productService.getProductById(value.idProducto).subscribe((response: any) => {
        this.ngxService.stop();
        this.precioUnitario = response.precioUnitario;

        // Establecer el precio unitario en el formulario
        this.manageSaleForm.controls['precioUnitario'].setValue(response.precioUnitario);

        // Establecer la cantidad predeterminada a 1 (puedes ajustar esto según tus necesidades)
        this.manageSaleForm.controls['cantidad'].setValue(1);

        // Calcular y establecer el valor del subtotal
        const cantidad = this.manageSaleForm.controls['cantidad'].value;
        const subtotal = cantidad * response.precioUnitario;
        this.manageSaleForm.controls['subtotal'].setValue(subtotal);

      }, (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }


  setQuantity(value: any) {
    var temp = this.manageSaleForm.controls['cantidad'].value;
    if (temp > 0) {
      this.manageSaleForm.controls['subtotal'].setValue(this.manageSaleForm.controls['cantidad'].value * this.manageSaleForm.controls['precioUnitario'].value)
    } else if (temp != '') {
      this.manageSaleForm.controls['cantidad'].setValue('1');
      this.manageSaleForm.controls['subtotal'].setValue(this.manageSaleForm.controls['cantidad'].value *
        this.manageSaleForm.controls['precio'].value);
    }
  }

  validateRoomAdd() {
    if (this.manageSaleForm.controls['subtotal'].value === 0 || this.manageSaleForm.controls['subtotal'].value === null ||
      this.manageSaleForm.controls['cantidad'].value <= 0) {
      return true;
    } else
      return false;
  }

  validateSubmit() {
    if (this.totalVenta === 0 || this.manageSaleForm.controls['idCliente'].value === null) {
      return true;
    } else
      return false;
  }

  add() {
    // var testing = this.manageSaleForm.get('date').value.format('LL')
    var formData = this.manageSaleForm.value;
    var product = this.dataSource.find((e: { id: number }) => e.id === formData.producto.idProducto);
    if (product === undefined) {
      this.totalVenta = this.totalVenta + formData.subtotal;
      this.dataSource.push({
        productoId: formData.producto.idProducto,
        nombreProducto: formData.producto.nombre,
        descripcionProducto: formData.producto.descripcion,
        precioUnitario: formData.producto.precioUnitario,
        cantidad: formData.cantidad,
        subtotal: formData.subtotal,
        // price: formData.price,
        // // date: testing,
        // total: formData.total,

      })
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.roomAdded, "success");
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.roomExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(value: any, element: any) {
    this.totalVenta = this.totalVenta - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    var formData = this.manageSaleForm.value;

    // Convertir dataSource a un array de objetos
    const detalleVentasArray = this.dataSource.map((item: { productoId: any; precioUnitario: any; cantidad: any; subtotal: any; }) => ({
      productoId: item.productoId,
      precioUnitario: item.precioUnitario,
      cantidad: item.cantidad,
      subtotal: item.subtotal
    }));

    var data = {
      clienteId: formData.idCliente,
      totalVenta: this.totalVenta.toString(),
      detalleVentas: detalleVentasArray
    };

    this.ngxService.start();
    this.saleService.add(data).subscribe(
      (response: any) => {
        // this.downloadFile(response?.uuid);
        this.manageSaleForm.reset();
        this.dataSource = [];
        this.totalVenta = 0;
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );

    this.ngxService.stop();

    console.log(data);
  }

  // downloadFile(fileName: string){
  //   var data = {
  //     uuid: fileName
  //   }
  //
  //   this.reservationService.getPdf(data).subscribe((response:any)=>{
  //     saveAs(response, fileName + '.pdf');
  //     this.ngxService.stop();
  //   })
  // }


}
