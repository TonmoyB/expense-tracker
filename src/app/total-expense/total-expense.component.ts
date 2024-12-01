import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-total-expense',
  templateUrl: './total-expense.component.html',
  styleUrls: ['./total-expense.component.css'],
})
export class TotalExpenseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() totalExpenses: number = 0;
  @Input() categoryExpenses: { [key: string]: number } = {};
  categories: string[] = ['Food', 'Travel', 'Medicines', 'Household'];

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('storage', this.onStorageChange.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalExpenses'] || changes['categoryExpenses']) {
      console.log('Total expense or category breakdown updated:', {
        totalExpenses: this.totalExpenses,
        categoryExpenses: this.categoryExpenses,
      });
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.onStorageChange.bind(this));
  }

  onStorageChange(event: StorageEvent): void {
    if (event.key === 'expenses' && event.newValue) {
      const updatedExpenses = JSON.parse(event.newValue);
      this.calculateSummary(updatedExpenses);
    }
  }

  calculateSummary(
    expenses: { amount: number; category: string }[]
  ): void {
    this.totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    this.categoryExpenses = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  }

  updateTotalExpense(): void {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.calculateSummary(expenses);
  }

}