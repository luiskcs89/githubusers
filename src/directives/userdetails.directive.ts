import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { User } from '../models/user';
//import { Store } from '@ngrx/store'; 
//import { AppState } from '../services/app-state';  
//import * as users from '../actions/users.actions';
import { UserService } from '../services/user.service';

@Directive({ selector: '[userDetails]' })
export class UserDetailsDirective {

    constructor(public el: ElementRef, public renderer: Renderer, private svc: UserService) {}

    @Input() userDetails: User;

    ngAfterViewInit(){
        this.svc.getUser(this.userDetails.login).subscribe((result) => {
            if(result.public_repos > 2) {
                this.renderer.setElementStyle(this.el.nativeElement, 'color', 'red');
            }
        });
    }
}