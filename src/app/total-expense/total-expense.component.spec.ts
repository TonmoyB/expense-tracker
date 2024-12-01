import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpenseComponent } from './total-expense.component';

describe('TotalExpenseComponent', () => {
  let component: TotalExpenseComponent;
  let fixture: ComponentFixture<TotalExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
