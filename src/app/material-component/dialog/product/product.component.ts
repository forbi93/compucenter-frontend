import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {GlobalConstants} from "../../../shared/global-constants";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";

  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              public dialogRef: MatDialogRef<ProductComponent>,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      nombre:[null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precioUnitario: [null, [Validators.required]],
      stock: [null, [Validators.required]],
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit"
      this.action = "Update"
      this.productForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var formData = this.productForm.value;
    var data = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precioUnitario: formData.precioUnitario,
      stock: formData.stock,
    }

    this.productService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddProduct.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  edit() {
    var formData = this.productForm.value;
    var data = {
      idProducto:this.dialogData.data.idProducto,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precioUnitario: formData.precioUnitario,
      stock: formData.stock
    }

    this.productService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditProduct.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

}
