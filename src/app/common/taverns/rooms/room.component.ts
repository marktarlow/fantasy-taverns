import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTavernService, ITavern } from '../my.tavern.service';
import { Observable } from 'rxjs';
import { IRoom, RoomService } from './room.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html'
}) export class RoomComponent implements OnInit {

    isNew: boolean;

    todo: IRoom = {
        ID: 0,
        RoomName: '',
        RoomStatus: false,
        TavernID: 0,
        DailyRate: 0,
    };

    roomForm = new FormGroup({
        Name: new FormControl('', [Validators.required]),
    });

    constructor(
        private roomService: RoomService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        const roomId: string = this.route.snapshot.params.todoId;
    }
}
