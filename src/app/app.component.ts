import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   form!: FormGroup;

   constructor(private fb: FormBuilder) {}

   ngOnInit(): void {
      this.form = this.fb.group({
         nickname: ['', Validators.required],
         personal: ['']
      });
   }

   onSubmit(): void {
     console.log(this.form.value);
   }
}
