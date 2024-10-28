import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatIconModule],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
}) 
export class UserDialogComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  touched = false;
  loading = false;
  checkAddedUser = false;
  
  
  firstName: string = '';
  lastName: string = '';
  birthDate: Date | null = null;
  street: string = '';
  zipCode: number | null = null;
  city: string = '';

  firstNameControl = new FormControl();
  lastNameControl = new FormControl();
  birthDateControl = new FormControl();
  streetControl = new FormControl();
  zipCodeControl = new FormControl();
  cityControl = new FormControl();

 
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public userData: any = {}) {
      this.firstName = userData.firstName || ''; 
      this.lastName = userData.lastName || '';
      this.birthDate = userData.birthDate || '';
      this.street = userData.street || '';
      this.zipCode = userData.zipCode || '';
      this.city = userData.city ||'';

      const aCollection = collection(this.firestore, 'items');
      this.items$ = collectionData(aCollection);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveUser() {
    this.checkValidInput();
    if (this.firstName && this.lastName && this.birthDate && this.street && this.zipCode && this.city) {
      this.checkAddedUser = true;
      this.userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate ? this.birthDate.getTime() : null,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city
      };
  
      await this.addUserData();
    }   
  }

  async addUserData() {
    this.loading = true;

    try {
      await addDoc(collection(this.firestore, 'users'), {
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        birthDate: this.userData.birthDate,
        street: this.userData.street,
        zipCode: this.userData.zipCode,
        city: this.userData.city
      })
    } catch (error) {
      console.error("Fehler beim Speichern des Benutzers:", error);
    } finally {
      setTimeout(() => {
        this.loading = false;
        this.checkAddedUser = true;
        this.clearInput();
      }, 1000);
      setTimeout(() => {
        this.dialogRef.close();
      }, 2500);
    }
  }

  checkValidInput() {
      this.firstNameControl.markAsTouched();
      this.lastNameControl.markAsTouched();
      this.birthDateControl.markAsTouched();
      this.streetControl.markAsTouched();
      this.streetControl.markAsTouched();
      this.zipCodeControl.markAsTouched();
      this.cityControl.markAsTouched();
  }

  clearInput() {
    this.firstName = '';
    this.lastName = '';
    this.birthDate = null;
    this.street = '';
    this.zipCode = null;
    this.city = '';

    this.firstNameControl.markAsUntouched();
    this.lastNameControl.markAsUntouched();
    this.birthDateControl.markAsUntouched();
    this.streetControl.markAsUntouched();
    this.streetControl.markAsUntouched();
    this.zipCodeControl.markAsUntouched();
    this.cityControl.markAsUntouched();
  }
}
