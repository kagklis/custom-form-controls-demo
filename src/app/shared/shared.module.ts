import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequiredFieldComponent } from './required-field/required-field.component';
import { PersonalComponent } from './personal/personal.component';

@NgModule({
   declarations: [RequiredFieldComponent, PersonalComponent],
   imports: [CommonModule, FormsModule, ReactiveFormsModule],
   exports: [FormsModule, ReactiveFormsModule, RequiredFieldComponent, PersonalComponent],
})
export class SharedModule {}
