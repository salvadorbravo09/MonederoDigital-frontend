import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  // Lista todos los ingresos
  getAllIncomes(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/v1/income/all');
  }

  // Lista un ingreso por ID
  getIncomeById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/v1/income/${id}`);
  }

  // Crea un nuevo ingreso
  postIncome(incomeDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/v1/income', incomeDTO);
  }

  // Actualiza un ingreso por ID
  updateIncome(id: number, incomeDTO: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/v1/income/${id}`, incomeDTO);
  }

  // Eliminar un ingreso
  deleteIncome(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/v1/income/${id}`);
  }
}
