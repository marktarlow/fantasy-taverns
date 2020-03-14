import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTavernService, ITavern } from './my.tavern.service';

@Component({
    templateUrl: './my.tavern.component.html'
}) export class MyTavernComponent implements OnInit, OnDestroy {

    constructor(private myTavernService: MyTavernService) {}

    taverns: ITavern[];

    ngOnInit(): void {
        this.myTavernService.getTaverns().subscribe((taverns) => {
            this.taverns = taverns;
        });
    }

    ngOnDestroy(): void {

    }

}