import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ITavern, MyTavernService } from '../../taverns/my.tavern.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    tavernID = '';
    tavernName = '';
    managerSignUp = false;
    adminSignUp = false;
    showSignUp = false;
    taverns: ITavern[];


    constructor(private router: Router, private authService: AuthService, private myTavernService: MyTavernService) {}

    ngOnInit(): void {
        this.myTavernService.getTaverns().subscribe((taverns) => {
           this.taverns = taverns;
           console.log(taverns);
        });
    }

    ngOnDestroy(): void {
        console.log('Is Destroyed');
    }

    toggleSignUp(): void {
        this.showSignUp = !this.showSignUp;
        this.userName = '';
        this.password = '';
    }

    toggleAdmin(): void {
        this.adminSignUp = !this.adminSignUp;
    }

    toggleManager(): void {
        this.managerSignUp = !this.managerSignUp;
    }

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect'); 
            },
        );
    }

    signUp(): void {
        const payload = {
            userName: this.userName,
            password: this.password
        };
        console.log(payload);
    }
}
