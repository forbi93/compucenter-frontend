import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../../services/customer.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-view-sales-latest',
  templateUrl: './view-sales-latest.component.html',
  styleUrls: ['./view-sales-latest.component.css']
})
export class ViewSalesLatestComponent implements OnInit {

  displayedColumns: string[] = ['cliente', 'descripcion', 'precio', 'cantidad', 'total'];
  dataSource: any;
  data: any;
  customerDetails: any;
  productDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewSalesLatestComponent>,
    private customerService: CustomerService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.data = this.dialogData.data;

    // Obtener detalles del cliente
    this.customerService.getCustomerById(this.data.clienteId).subscribe(
      (customer) => {
        this.customerDetails = customer;
        console.log('Detalles del cliente:', customer);
        // Puedes asignar los detalles del cliente a una propiedad si es necesario
      },
      (error) => {
        console.error('Error al obtener detalles del cliente:', error);
      }
    );

    // Obtener detalles del producto
    const productId = this.data.detalleVentas[0].productoId;
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.productDetails = product;
        console.log('Detalles del producto:', product);
        // Puedes asignar los detalles del producto a una propiedad si es necesario
      },
      (error) => {
        console.error('Error al obtener detalles del producto:', error);
      }
    );

    this.dataSource = this.data.detalleVentas;
    console.log(this.dialogData.data);
  }
}
