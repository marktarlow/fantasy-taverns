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

    room: IRoom = {
        ID: 0,
        RoomName: '',
        RoomStatus: false,
        TavernID: 0,
        DailyRate: 0,
    };

    roomForm = new FormGroup({
        Name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        Rate: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });

    constructor(
        private roomService: RoomService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        const roomId: string = this.route.snapshot.params.roomId;
        if (roomId === 'add') {
            this.isNew = true;
        } else {
            this.isNew = false;
            this.roomService.getById(+roomId).subscribe((room) => {
                this.room = room;
                this.roomForm.setValue({ Name:  room.RoomName, Rate: room.DailyRate});
            });
        }

    }

    saveRoom(): void {
        if (this.roomForm.valid) {
            this.room.RoomName = this.roomForm.value.Name;
            this.room.DailyRate = this.roomForm.value.Rate;
            this.roomService.saveRoom(this.room).subscribe((room: IRoom) => {
                this.router.navigate(['/my-tavern']);
            });
        }

    }
}
