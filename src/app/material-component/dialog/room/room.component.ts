import {Component, EventEmitter, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../../services/customer.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {GlobalConstants} from "../../../shared/global-constants";
import {RoomService} from "../../../services/room.service";
import {TyperoomService} from "../../../services/typeroom.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  onAddRoom = new EventEmitter();
  onEditRoom = new EventEmitter();
  typeRoomForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  typeRooms: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private formBuilder: FormBuilder,
              private roomService: RoomService,
              public dialogRef: MatDialogRef<RoomComponent>,
              private typeRoomService: TyperoomService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.typeRoomForm = this.formBuilder.group({
      name:[null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      typeRoomId: [null, [Validators.required]],
      description: [null, [Validators.required]],
      beds: [null, [Validators.required]],
      observations: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit"
      this.action = "Update"
      this.typeRoomForm.patchValue(this.dialogData.data);
    }
    this.getTypeRooms();
  }

  getTypeRooms(){
    this.typeRoomService.getTypeRooms().subscribe((response:any)=>{
      this.typeRooms = response;
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

  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var formData = this.typeRoomForm.value;
    var data = {
      name: formData.name,
      typeRoomId: formData.typeRoomId,
      description: formData.description,
      beds: formData.beds,
      observations: formData.observations,
      price: formData.price
    }

    this.roomService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddRoom.emit();
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
    var formData = this.typeRoomForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      typeRoomId: formData.typeRoomId,
      description: formData.description,
      beds: formData.beds,
      observations: formData.observations,
      price: formData.price
    }

    this.roomService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditRoom.emit();
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
