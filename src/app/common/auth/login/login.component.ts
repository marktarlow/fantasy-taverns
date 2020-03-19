import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ITavern, MyTavernService } from '../../taverns/my.tavern.service';


@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    tavernName = '';
    managerSignUp = false;
    adminSignUp = false;
    showSignUp = false;
    taverns: ITavern[];
    selectedTavern: any;


    constructor(private router: Router, private authService: AuthService, private myTavernService: MyTavernService) {}

    ngOnInit(): void {
        this.myTavernService.getTaverns().subscribe((taverns) => {
           this.taverns = taverns;
        });
    }

    ngOnDestroy(): void {
        console.log('Is Destroyed');
    }

    toggleSignUp(): void {
        if (this.adminSignUp) {
            this.tavernName = '';
            this.adminSignUp = !this.adminSignUp;
        }
        if (this.managerSignUp)
        {
            this.selectedTavern = undefined;
            this.managerSignUp = !this.managerSignUp;
        }
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
                    this.router.navigateByUrl('/my-tavern');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }

    signUp(): void {
        if (this.selectedTavern === undefined) {
            this.selectedTavern = {
                ID: 0,
                TavernName: this.tavernName
            };
        }
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: this.selectedTavern
        };
        console.log(payload.Tavern.ID);
        this.authService.signup(payload).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful signup');
                    this.toggleSignUp();
                }
            },
            (error) => {
                console.log('Please Enter a Password');
            },
        );
    }
}
