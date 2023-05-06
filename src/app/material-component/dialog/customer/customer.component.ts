import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {CustomerService} from "../../../services/customer.service";
import {GlobalConstants} from "../../../shared/global-constants";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

  onAddCustomer = new EventEmitter();
  onEditCustomer = new EventEmitter();
  customerForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";

  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private formBuilder: FormBuilder,
              private customerService: CustomerService,
              public dialogRef: MatDialogRef<CustomerComponent>,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name:[null, [Validators.required]],
      lastName: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
      dni: [null, [Validators.required]]
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit"
      this.action = "Update"
      this.customerForm.patchValue(this.dialogData.data);
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
    var formData = this.customerForm.value;
    var data = {
      name: formData.name,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      dni: formData.dni
    }

    this.customerService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddCustomer.emit();
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
    var formData = this.customerForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      dni: formData.dni
    }

    this.customerService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddCustomer.emit();
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
