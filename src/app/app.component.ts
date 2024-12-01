import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "expense-tracker";
  expenses: { id: string; amount: number; date: string; category: string }[] =
    [];
  totalExpense: number = 0;
  categoryExpenses: { [key: string]: number } = {};

  constructor() {
    this.loadExpenses();
  }

  loadExpenses(): void {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = savedExpenses;
    this.updateSummary();
  }

  onExpenseAdded(newExpense: {
    id: string;
    amount: number;
    date: string;
    category: string;
  }): void {
    this.expenses = [...this.expenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.updateSummary();
  }

  updateSummary(): void {
    this.totalExpense = this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    console.log(this.totalExpense);

    this.categoryExpenses = this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  }

  updateTotalExpense(): void {
    this.loadExpenses();
    this.updateSummary();
  }
}
