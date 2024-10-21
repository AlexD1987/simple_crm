import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment"; 
import { Firestore } from '@angular/fire/firestore';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ToolBarComponent, BrowserModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    title = 'simpleCrm';
    

}
