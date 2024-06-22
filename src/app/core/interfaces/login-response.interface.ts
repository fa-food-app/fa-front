import { Login } from './login-user.interface';
import { User } from './user.interface';
export interface LoginResponse{
    user:User;
    token:string;
}