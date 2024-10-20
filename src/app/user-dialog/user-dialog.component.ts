import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  
  firstName: string = '';
  lastName: string = '';
  birthDate: Date;
  street: string = '';
  zipCode: number | null = null;
  city: string = '';

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
    this.userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate.getTime(),
      street: this.street,
      zipCode: this.zipCode,
      city: this.city
    };

    await this.addUserData();
    
  }

  async addUserData() {
    const docRef = await addDoc(collection(this.firestore, 'users'), {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      birthDate: this.userData.birthDate,
      street: this.userData.street,
      zipCode: this.userData.zipCode,
      city: this.userData.city
    })
    console.log(this.userData);
  }
}
