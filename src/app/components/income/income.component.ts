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

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private incomeService: IncomeService
  ) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.incomeService.postIncome(this.incomeForm.value).subscribe(res => {
      this.message.success("Income posted succesfully", { nzDuration: 5000 })
    }, error => {
      this.message.error("Error while posting income", { nzDuration: 5000 })
    })
  }
}
