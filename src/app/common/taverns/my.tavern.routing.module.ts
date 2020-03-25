import { NgModule } from '@angular/core';
import { MyTavernComponent } from './my.tavern.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoomComponent } from './rooms/room.component';
import { GuestStayComponent } from './guests/guest.stay.component';


const tavernRoutes: Routes = [
    { path: 'my-tavern', component: MyTavernComponent, canActivate: [AuthGuard],
    children: [
        {
        path: 'book-room',
        component: GuestStayComponent,
        canActivate: [AuthGuard]
        }
        ],
    },
    {path: 'my-tavern/:roomId', component: RoomComponent, canActivate: [AuthGuard]},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(tavernRoutes)],

}) export class MyTavernRoutingModule {

}
