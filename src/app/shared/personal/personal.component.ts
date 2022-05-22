import { Component, OnDestroy, OnInit } from '@angular/core';
import {
   ControlValueAccessor,
   FormGroup,
   Validators,
   Validator,
   AbstractControl,
   ValidationErrors,
   NG_VALUE_ACCESSOR,
   FormBuilder,
   NG_VALIDATORS,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-personal',
   templateUrl: './personal.component.html',
   styleUrls: ['./personal.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         multi: true,
         useExisting: PersonalComponent,
      },
      {
         provide: NG_VALIDATORS,
         multi: true,
         useExisting: PersonalComponent,
      },
   ],
})
export class PersonalComponent
   implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
   form!: FormGroup;

   genderOptions: string[] = [
      'Female',
      'Male',
      'Non-binary',
      'Gender non-conforming',
      'Prefer not to say',
      'Other',
   ];

   onTouched: () => void = () => {};
   onChange: (value: any) => void = () => {};
   subscriptions: Subscription;

   constructor(private fb: FormBuilder) {
      this.subscriptions = new Subscription();
   }

   ngOnInit(): void {
      this.form = this.fb.group(
         {
            first: ['', Validators.required],
            last: ['', Validators.required],
            gender: ['', Validators.required],
            genderOther: ['', Validators.required],
         },
         { validators: this.allRequiredFieldsFilled }
      );
   }

   ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
   }

   validate(control: AbstractControl): ValidationErrors | null {
      return this.allRequiredFieldsFilled(control);
   }

   allRequiredFieldsFilled(control: AbstractControl): ValidationErrors | null {
      const controlValue = control.value;
      const isValid =
         controlValue.first &&
         controlValue.last &&
         controlValue.gender &&
         (controlValue.gender !== 'Other' || controlValue.genderOther);
      return isValid ? null : { required: true };
   }

   writeValue(value: any): void {
      value && this.form.setValue(value, { emitEvent: false });
   }

   registerOnChange(onChange: (value: any) => void): void {
      this.subscriptions.add(this.form.valueChanges.subscribe(onChange));
   }

   registerOnTouched(onTouched: () => void): void {
      this.onTouched = onTouched;
   }

   setDisabledState(disabled: boolean): void {
      disabled ? this.form.disable() : this.form.enable();
   }
}
