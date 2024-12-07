import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly storageKey = 'expenses';

  loadExpenses(): { id: string; amount: number; date: string; category: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveExpenses(expenses: { id: string; amount: number; date: string; category: string }[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }

  calculateTotal(expenses: { amount: number }[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateCategoryExpenses(
    expenses: { amount: number; category: string }[]
  ): { [key: string]: number } {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  }
}
