import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent implements OnInit {
  expenseForm!: FormGroup;

  listOfCategory: any[] = [
    'Educación',
    'Comestibles',
    'Salud',
    'Suscripciones',
    'Delivery',
    'Ropa',
    'Viajes',
    'Otro',
  ];

  expenses: any;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllExpenses();
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe((res) => {
      console.log(res);
      this.expenses = res;
    });
  }

  submitForm() {
    this.expenseService.postExpense(this.expenseForm.value).subscribe(
      (res) => {
        this.message.success('Gasto publicado correctamente', {
          nzDuration: 5000,
        });
      },
      (error) => {
        this.message.error('Error al registrar gastos', { nzDuration: 5000 });
      }
    );
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(res => {
      this.message.success("Gasto eliminado con éxito", {nzDuration: 5000});
      this.getAllExpenses();
    }, error => {
      this.message.error("Error al eliminar gasto", {nzDuration: 5000})
    })
  }

  
}
