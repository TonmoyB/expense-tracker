import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExpenseComponent } from './filter-expense.component';

describe('FilterExpenseComponent', () => {
  let component: FilterExpenseComponent;
  let fixture: ComponentFixture<FilterExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
