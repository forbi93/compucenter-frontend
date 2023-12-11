import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-sales-rooms',
  templateUrl: './view-reservation-rooms.component.html',
  styleUrls: ['./view-reservation-rooms.component.css']
})
export class ViewReservationRoomsComponent implements OnInit{

  displayedColumns: string[] = ['name','typeRoom','price','quantity','date','total'];
  dataSource:any;
  data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              public dialogRef : MatDialogRef<ViewReservationRoomsComponent>) { }

  ngOnInit() {
    this.data = this.dialogData.data;
    this.dataSource = JSON.parse(this.dialogData.data.roomDetail);
    console.log(this.dialogData.data);
  }

}
