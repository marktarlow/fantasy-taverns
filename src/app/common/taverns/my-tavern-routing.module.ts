import { NgModule } from "@angular/core";
import { MyTavernComponent } from './my.tavern.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from 'src/app/home.component';

const tavernRoutes: Routes = [
    { path: 'my-tavern', component: MyTavernComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
    
    exports: [RouterModule],
    imports: [RouterModule.forChild(tavernRoutes)],

}) export class MyTavernRoutingModule {

}