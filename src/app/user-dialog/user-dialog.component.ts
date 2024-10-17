import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog'; 



@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
