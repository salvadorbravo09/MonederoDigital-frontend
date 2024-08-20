import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../services/income/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  listOfCategory: any[] = [
    'Salario',
    'Freelance',
    'Inversiones',
    'Acciones',
    'Bitcoin',
    'Transferencia Bancaria',
    'Youtube',
    'Otro',
  ];
  incomes: any;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private incomeService: IncomeService
  ) { }

  ngOnInit(): void {
    this.getAllIncomes();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe(res => {
      this.incomes = res;
    }, error => {
      this.message.error("Error al buscar los ingresos", { nzDuration: 5000 });
    })
  }

  submitForm(): void {
    this.incomeService.postIncome(this.incomeForm.value).subscribe(res => {
      this.message.success("Ingreso creado correctamente", { nzDuration: 5000 })
      this.getAllIncomes();
    }, error => {
      this.message.error("Errro al crear un nuevo ingreso", { nzDuration: 5000 })
    })
  }

  deleteIncome(id: number) {
    this.incomeService.deleteIncome(id).subscribe(res => {
      this.message.success("Ingreso eliminado correctamente", { nzDuration: 5000 })
      this.getAllIncomes();
    }, error => {
      this.message.error("Error al eliminar un ingreso", { nzDuration: 5000 })
    })
  }
}
