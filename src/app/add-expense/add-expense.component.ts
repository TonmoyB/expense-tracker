import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  @Output() expenseAdded = new EventEmitter<{
    id: string;
    amount: number;
    date: string;
    category: string;
  }>();

  amount: number | null = null;
  date: string = '';
  category: string = '';

  constructor() { }

  saveExpense(): void {
    if (!this.amount || !this.date || !this.category) {
      alert('Please fill out all fields!!!');
      return;
    }

    if (this.amount <= 0) {
      alert('Enter Positive Amount!!!');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: this.amount!,
      date: this.date,
      category: this.category,
    };

    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    this.expenseAdded.emit(newExpense);

    this.amount = null;
    this.date = '';
    this.category = '';
  }
}
