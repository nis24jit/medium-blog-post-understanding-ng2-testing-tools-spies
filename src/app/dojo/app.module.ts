import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaterialModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { DataDisplayComponent } from "./data-display.component";

import { routing } from "./app.routing";
import { DataService } from "./services";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // used only to get ngModel for 2 way binding
    ReactiveFormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    DataDisplayComponent,
  ],
  providers: [
    DataService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
