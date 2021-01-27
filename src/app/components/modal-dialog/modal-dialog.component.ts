import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


class fd {
}
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
 // @Output() CreateNewTransaction = new EventEmitter<string>();
  amount: string = "100"; OperationType: string = "Debit";
  constructor(private dialogRef: MatDialogRef<ModalDialogComponent>) {
    
  }

  ngOnInit(): void {
  }

  CreateNewTran():void {
    console.log('closing ');
    var NewOperationData: any = { amount: this.amount, OperationType: this.OperationType }; 
    this.dialogRef.close(NewOperationData);
    //this.CreateNewTransaction.emit(this.amount);
  }
}
