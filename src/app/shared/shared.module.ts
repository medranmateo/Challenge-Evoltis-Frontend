import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

//PrimeNg
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule
  ]
})
export class SharedModule { }
