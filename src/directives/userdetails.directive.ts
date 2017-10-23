//UserDetails directive

import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Directive({ selector: '[userDetails]' })
export class UserDetailsDirective {

    constructor(public el: ElementRef, public renderer: Renderer, private svc: UserService) {}

    //Gets the user data as a input from the directive
    @Input() userDetails: User;

    ngAfterViewInit(){
    	//Checks if the user has 2 or more public repos
        this.svc.getUser(this.userDetails.login).subscribe((result) => {
            if(result.public_repos > 2) {
            	//Change text color to red
                this.renderer.setElementStyle(this.el.nativeElement, 'color', 'red');
            }
        });
    }
}