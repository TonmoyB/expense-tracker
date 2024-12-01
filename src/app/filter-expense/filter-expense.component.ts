import { Component, Input, Output, OnChanges, EventEmitter, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-expense',
  templateUrl: './filter-expense.component.html',
  styleUrls: ['./filter-expense.component.css'],
})

export class FilterExpenseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() expenses: {
    id: string;
    amount: number;
    date: string;
    category: string;
  }[] = [];
  filteredExpenses: {
    id: string;
    amount: number;
    date: string;
    category: string;
  }[] = [];
  startDate: string = '';
  endDate: string = '';

  @Output() expenseUpdated = new EventEmitter<void>();

  ngOnInit(): void {
    this.filteredExpenses = [...this.expenses];
    window.addEventListener('storage', this.onStorageChange.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.filteredExpenses = [...this.expenses];
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.onStorageChange.bind(this));
  }

  onStorageChange(event: StorageEvent): void {
    if (event.key === 'expenses' && event.newValue) {
      this.expenses = JSON.parse(event.newValue);
      this.filteredExpenses = [...this.expenses];
    }
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter((expense) => {
      return (
        (!this.startDate || expense.date >= this.startDate) &&
        (!this.endDate || expense.date <= this.endDate)
      );
    });
  }

  editExpense(expense: {
    id: string;
    amount: number;
    date: string;
    category: string;
  }): void {
    console.log('Editing expense:', expense);
  }

  deleteExpense(id: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');

    if (confirmDelete) {
      this.expenses = this.expenses.filter((expense) => expense.id !== id);
      this.filteredExpenses = [...this.expenses];
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
      
      this.expenseUpdated.emit();
    }
  }
}
