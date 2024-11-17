import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, docData, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatIconModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent implements OnInit, OnDestroy {

  constructor(private dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { id: string }, private router: Router, private route: ActivatedRoute, private firestore: Firestore) { }
  userInfo: any = {};
  userId: string | undefined;
  loadedUser = false;
  private unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    const getUser = doc(this.firestore, 'users/' + this.data.id);
    this.userId = this.data.id;

    if (getUser) {
      this.loadedUser = true;
      docData(getUser)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (data: {}) => {
            this.userInfo = data;
            console.log(this.userInfo);
          }
        )
    }
  }

  saveEditData() {
    if (this.userId) {
      const userRef = doc(this.firestore, 'users/' + this.userId);
      updateDoc(userRef, this.userInfo)
        .then(() => this.dialogRef.closeAll())
    }
  }

  deleteUser() {
    if (this.userId) {
      const userRef = doc(this.firestore, 'users/' + this.userId);
      this.dialogRef.closeAll();
      setTimeout(() => {
        deleteDoc(userRef)
          .then(() => {
            this.loadedUser = false;
            this.router.navigate(['/user']);
          })
      }, 500);
    }
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
