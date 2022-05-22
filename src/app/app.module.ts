import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, NgbModule, SharedModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
