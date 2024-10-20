import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ToolBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    title = 'simpleCrm';

    firebaseConfig = {
        apiKey: "AIzaSyBIA3rWRnvyvGM2VI6AgOnbtgEUtOhGsCY",
        authDomain: "simple-crm-6733d.firebaseapp.com",
        projectId: "simple-crm-6733d",
        storageBucket: "simple-crm-6733d.appspot.com",
        messagingSenderId: "1023126924437",
        appId: "1:1023126924437:web:8f937be0291fb44fac7f9c"
    };

    app = initializeApp(this.firebaseConfig);
    db = getFirestore(this.app);
}
