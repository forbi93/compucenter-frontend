import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-sales-ruc-rooms',
  templateUrl: './view-reservation-ruc-rooms.component.html',
  styleUrls: ['./view-reservation-ruc-rooms.component.css']
})
export class ViewReservationRucRoomsComponent {

  displayedColumns: string[] = ['name','typeRoom','price','quantity','date','total'];
  dataSource:any;
  data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              public dialogRef : MatDialogRef<ViewReservationRucRoomsComponent>) { }

  ngOnInit() {
    this.data = this.dialogData.data;
    this.dataSource = JSON.parse(this.dialogData.data.roomDetail);
    console.log(this.dialogData.data);
  }

}
