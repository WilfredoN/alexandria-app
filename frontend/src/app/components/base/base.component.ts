import {Component} from '@angular/core';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css'],
})
export class BaseComponent {
    isPanelExpanded: boolean = false;
    user: any = JSON.parse(localStorage.getItem('user') as string);
}
