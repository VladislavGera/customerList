import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerReq } from 'src/app/models/customerReq.model';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerReq
  ) {}
  customer = {
    email: this.data.element.email,
    contactTelephone: this.data.element.contactTelephone,
    contactName: this.data.element.contactName,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }
}
