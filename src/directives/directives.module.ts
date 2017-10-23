import { NgModule } from '@angular/core';

import { UserDetailsDirective } from './userdetails.directive';

@NgModule({
    declarations: [
        UserDetailsDirective
    ],
    exports: [
        UserDetailsDirective
    ]
})
export class DirectivesModule{}