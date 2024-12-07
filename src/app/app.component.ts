import { Component } from '@angular/core';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "expense-tracker";
  expenses: { id: string; amount: number; date: string; category: string }[] = [];
  totalExpense: number = 0;
  categoryExpenses: { [key: string]: number } = {};

  constructor(private expenseService: ExpenseService) {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.loadExpenses();
    this.updateSummary();
  }

  onExpenseAdded(newExpense: {
    id: string;
    amount: number;
    date: string;
    category: string;
  }): void {
    this.expenses = [...this.expenses, newExpense];
    this.expenseService.saveExpenses(this.expenses);
    this.updateSummary();
  }

  updateSummary(): void {
    this.totalExpense = this.expenseService.calculateTotal(this.expenses);
    this.categoryExpenses = this.expenseService.calculateCategoryExpenses(this.expenses);
  }
}
