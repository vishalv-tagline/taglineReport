import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SquarePipePipe } from './pipes/square-pipe.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    SquarePipePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SquarePipePipe
  ]
})
export class SharedModule { }
