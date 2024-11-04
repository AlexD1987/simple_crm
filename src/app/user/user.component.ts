import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Firestore, collectionData, CollectionReference, collection } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, UserDialogComponent, MatDialogModule, CommonModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {
  users: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) { }
  
  ngOnInit(): void {
    const userCollection: CollectionReference = collection(this.firestore, 'users');

    collectionData(userCollection, {idField: 'id'})
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result: any[]) => {
      this.users = result;
      console.log('Das sind die geladenen Users:', this.users);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openDialog() {
    this.dialog.open(UserDialogComponent, {
      width: '400px', 
      height: '728px',
      data:  {firstName: '', lastName: '', birtDate: '', street: '', zipCode: null, city: ''}
    });
  }

  logID(id: any) {
    console.log(id);
    this.router.navigate(['/user/', id]);
  }
}
