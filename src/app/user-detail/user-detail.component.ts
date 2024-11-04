import { Component, OnDestroy, OnInit } from '@angular/core';
import { CollectionReference, doc, Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { collection } from 'firebase/firestore';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy{
 constructor(private router: Router, private firestore: Firestore, private route: ActivatedRoute) {}
  userInfo = {};
  userId: string | undefined;
  private unsubscribe$ = new Subject<void>();


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        const userId = params.get('id');
        console.log(userId);

        const userCollection = collection(this.firestore, 'users');
        const userDocRef = doc(userCollection, userId);
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

 closeUserDetail() {
    this.router.navigate(['/user']);
 }
}
