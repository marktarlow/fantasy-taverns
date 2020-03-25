import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTavernComponent } from './my.tavern.component';
import { MyTavernRoutingModule } from './my.tavern.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './rooms/room.component';
import { GuestStayComponent } from './guests/guest.stay.component';

@NgModule ({

    declarations: [MyTavernComponent, RoomComponent, GuestStayComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MyTavernRoutingModule],
}) export class MyTavernModule {}
