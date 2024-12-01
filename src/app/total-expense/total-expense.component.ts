import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-expense',
  templateUrl: './total-expense.component.html',
  styleUrls: ['./total-expense.component.css']
})
export class TotalExpenseComponent implements OnInit {
  totalExpenses: number = 0;
  categoryExpenses: { [key: string]: number } = {};
  categories = ['Food', 'Travel', 'Medicines', 'Household'];

  ngOnInit() {
    this.calculateSummary();
  }

  calculateSummary() {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.totalExpenses = expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
    this.categoryExpenses = {};
    expenses.forEach((expense: any) => {
      this.categoryExpenses[expense.category] =
        (this.categoryExpenses[expense.category] || 0) + expense.amount;
    });
  }
}
