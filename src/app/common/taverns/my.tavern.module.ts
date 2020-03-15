import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTavernComponent } from './my.tavern.component';
import { MyTavernRoutingModule } from './my-tavern-routing.module';

@NgModule ({

    declarations: [MyTavernComponent],
    imports: [CommonModule, MyTavernRoutingModule],
}) export class MyTavernModule {}
