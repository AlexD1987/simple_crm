import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolBarComponent } from "./tool-bar/tool-bar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ToolBarComponent, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    title = 'simpleCrm';
    

}
