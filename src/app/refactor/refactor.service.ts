import { Injectable } from '@angular/core';
import { UsuariosI } from '../models/users.model';
@Injectable({
    providedIn: 'root'
    })
export class Refactor {
    user: UsuariosI;
    constructor(
       
    ){}
    account: {
        email: string;
        password: string;
    }

    setAccountInfo(email: string, password: string){
        this.account = {
            email: email,
            password: password
        }
    }

    
    getAccountInfo(){
        return this.account;
    }

    

}