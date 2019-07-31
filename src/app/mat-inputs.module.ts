import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatExpansionModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatRadioModule,
        MatMenuModule,
        HttpClientModule,
        MatTableModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatExpansionModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatRadioModule,
        MatMenuModule,
        MatTableModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatExpansionModule
    ],
    providers: [],
})
export class MatInputsModule { }