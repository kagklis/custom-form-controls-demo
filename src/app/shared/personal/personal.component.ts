import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  NgControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  form: FormGroup = this.fb.group({
    first: ['', Validators.required],
    last: ['', Validators.required],
    gender: ['', Validators.required],
    genderOther: ['', Validators.required],
  });

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

  constructor(private fb: FormBuilder, private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    const control = this.ngControl.control;
    if (!control) return;
    const validators = control.validator
      ? [control.validator, this.allRequiredFieldsFilled]
      : this.allRequiredFieldsFilled;
    control.addValidators(validators);
    control.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  allRequiredFieldsFilled(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value;
    if (!controlValue) return { required: true };
    const isValid =
      controlValue.first &&
      controlValue.last &&
      controlValue.gender &&
      (controlValue.gender !== 'Other' || controlValue.genderOther);
    return isValid ? null : { required: true };
  }

  onGenderChange(): void {
    this.form?.get('genderOther')?.reset('');
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
