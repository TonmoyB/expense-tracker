import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-expense',
  templateUrl: './filter-expense.component.html',
  styleUrls: ['./filter-expense.component.css']
})
export class FilterExpenseComponent implements OnInit {

  title: string = 'Expense Tracker';
  expenses: { id: string; amount: number; date: string; category: string }[] = [];
  filteredExpenses: { id: string; amount: number; date: string; category: string }[] = [];
  startDate: string = '';
  endDate: string = '';

  ngOnInit(): void {
    this.loadExpense();
    window.addEventListener('storage', this.fetchExpense);
  }
  fetchExpense(event: Event) {
    console.log("Hello", event)
  }

  loadExpense(): void {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = storedExpenses;
    this.filteredExpenses = [...this.expenses];
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense => {
      return (
        (!this.startDate || expense.date >= this.startDate) &&
        (!this.endDate || expense.date <= this.endDate)
      );
    });
  }

  editExpense(expense: { id: string; amount: number; date: string; category: string }): void {
    const index = this.expenses.findIndex(e => e.id === expense.id);
    if (index !== -1) {
      console.log('Editing expense:', expense);
    }
  }

  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.filteredExpenses = [...this.expenses];
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}
