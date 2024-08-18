import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  // Listar todos los gastos
  getAllExpenses(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/v1/expense/all');
  }

  getExpenseById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/v1/expense/${id}`);
  }

  // Crear un nuevo gasto
  postExpense(expenseDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/v1/expense', expenseDTO);
  }

  // Actualizar un gasto
  updateExpense(id: number, expenseDTO: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/v1/expense/${id}`, expenseDTO);
  }

  // Eliminar un gasto
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/v1/expense/${id}`);
  }
}
