import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  expenses: { amount: number; date: string; category: string }[] = [];
  totalExpense: number = 0;
  categoryExpenses: { [key: string]: number } = {};
  categories: string[] = ['Food', 'Travel', 'Medicines', 'Household'];

  constructor() {
    this.loadExpenses();
  }

  loadExpenses() {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = savedExpenses;
    this.updateSummary();
  }

  updateSummary() {
    this.totalExpense = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);

    this.categoryExpenses = this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  }
}
