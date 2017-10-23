//App state

import { User } from '../models/user';

export interface AppState {  
    users: User[];
    currentUser: User;
}