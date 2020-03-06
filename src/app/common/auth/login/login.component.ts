import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy{
    userName = '';
    password = '';
    showSignUp = false;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        console.log( {...this});
    }

    ngOnDestroy(): void{
        console.log('Is Destroyed');
    }

    toggleSignUp(): void{
        this.showSignUp = !this.showSignUp;
        this.userName = '';
        this.password = '';
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
