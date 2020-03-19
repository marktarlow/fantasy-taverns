import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTavernComponent } from './my.tavern.component';
import { MyTavernRoutingModule } from './my.tavern.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule ({

    declarations: [MyTavernComponent],
    imports: [CommonModule, ReactiveFormsModule, MyTavernRoutingModule],
}) export class MyTavernModule {}
