import {Component, EventEmitter, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {GlobalConstants} from "../../../shared/global-constants";
import {TyperoomService} from "../../../services/typeroom.service";

@Component({
  selector: 'app-typeroom',
  templateUrl: './typeroom.component.html',
  styleUrls: ['./typeroom.component.css']
})
export class TyperoomComponent {

  onAddTypeRoom = new EventEmitter();
  onEditTypeRoom = new EventEmitter();
  typeroomForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";

  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private formBuilder: FormBuilder,
              private typeroomService: TyperoomService,
              public dialogRef: MatDialogRef<TyperoomComponent>,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.typeroomForm = this.formBuilder.group({
      name:[null, [Validators.required]],
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit"
      this.action = "Update"
      this.typeroomForm.patchValue(this.dialogData.data);
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
    var formData = this.typeroomForm.value;
    var data = {
      name: formData.name,
    }

    this.typeroomService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddTypeRoom.emit();
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
    var formData = this.typeroomForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name,
    }

    this.typeroomService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddTypeRoom.emit();
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
