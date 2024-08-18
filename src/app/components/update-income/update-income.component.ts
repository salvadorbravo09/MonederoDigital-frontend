import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../services/income/income.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.scss',
})
export class UpdateIncomeComponent {

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

  id!: number;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private incomeService: IncomeService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.id = this.activatedRouter.snapshot.params['id'];
    this.getIncomeById();
  }

  getIncomeById() {
    this.incomeService.getIncomeById(this.id).subscribe(res => {
      this.incomeForm.patchValue(res);
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }

  submitForm() {
    this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(res => {
      this.message.success("Income updated succesfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/income")
    }, error => {
      this.message.error("Error while updateing income", { nzDuration: 5000 });
    })
  }
}
