import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { NgbAccordion, NgbAlertModule, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Alert {
  type: string;
  message: string;
}
interface AccountHistory {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}, {
  type: 'info',
  message: 'This is an info alert',
}, {
  type: 'warning',
  message: 'This is a warning alert',
}, {
  type: 'danger',
  message: 'This is a danger alert',
}, {
  type: 'primary',
  message: 'This is a primary alert',
}, {
  type: 'secondary',
  message: 'This is a secondary alert',
}, {
  type: 'light',
  message: 'This is a light alert',
}, {
  type: 'dark',
  message: 'This is a dark alert',
}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngSustainment';
  accountHistory: any;

  constructor(private dialog: MatDialog, private http: HttpClient, private _snackBar: MatSnackBar) {
    this.loadAccountTransData();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',      
    });
  }

  loadAccountTransData() {
    this.http.get('https://localhost:44313/api/bank').subscribe({
      next: data => {
        this.accountHistory = JSON.parse(JSON.stringify(data));
        console.log("then" + JSON.stringify(data));
      },
      error: error => {
        //this.accountHistory = error.message;
        console.error('There was an error!', error);
      }
    })
  }
  openDialog() {
    const dialogRef =
      this.dialog.open(ModalDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.CreateNewTransaction(data);
    });
  }

  CreateNewTransaction(data: any) {
    var NewOperationData: any = { Account: "00400", Amount: data.amount, OperationType: data.OperationType }; 
    this.http.post('https://localhost:44313/api/bank', NewOperationData).subscribe({
      next: data => {
        //this.accountHistory = JSON.parse(JSON.stringify(data));
        //console.log("then" + JSON.stringify(data));
        this.openSnackBar('Transaction created!', 'Transaction created!');
        this.loadAccountTransData();
      },
      error: error => {
        this.openSnackBar('Error, insufficent funds! ', 'Error, insufficent funds! ');
        //alert('Error, insufficent funds! ');// + JSON.parse(error).error.Message);
        console.error('There was an error!', error);
      }
    })
  }
}
