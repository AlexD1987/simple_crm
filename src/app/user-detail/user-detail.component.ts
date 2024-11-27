import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

export class UserDetailComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private firestore: Firestore, private route: ActivatedRoute, public dialog: MatDialog) { }
  userInfo: any = {};
  userId: string | undefined;
  private unsubscribe$ = new Subject<void>();


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = params.get('id');
      this.saveUserId(userId);

      const userRef = doc(this.firestore, 'users/' + userId);
      console.log(userRef);
      docData(userRef)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (data: {}) => {
            this.userInfo = data;
            console.log(this.userInfo);
          }
        )
    }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveUserId(id: string | null) {
    if (id) {
      this.userId = id;
    }
  }

  closeUserDetail() {
    this.router.navigate(['/user']);
  }

  openEditDialog() {
    this.dialog.open(EditDialogComponent, {
      data: { id: this.userId },
    });
  };
}
