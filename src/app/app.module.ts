import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { TotalExpenseComponent } from './total-expense/total-expense.component';
import { FilterExpenseComponent } from './filter-expense/filter-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    TotalExpenseComponent,
    FilterExpenseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
