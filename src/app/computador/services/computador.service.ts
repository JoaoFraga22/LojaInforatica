import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComputadorInterface } from '../types/computador.interface';

@Injectable()
export class ComputadorService {
  constructor(private http: HttpClient) { }

  getComputador(id: number): Observable<ComputadorInterface> {
    return this.http.get<ComputadorInterface>(`${environment.apiUrl}/computadores/${id}`);
  }

  getComputadores(): Observable<ComputadorInterface[]> {
    return this.http.get<ComputadorInterface[]>(`${environment.apiUrl}/computadores`);
  }

  save(computador: ComputadorInterface): Observable<ComputadorInterface> {
    return this.http.post<ComputadorInterface>(`${environment.apiUrl}/computadores`, computador);
  }

  update(computador: ComputadorInterface): Observable<ComputadorInterface> {
    return this.http.put<ComputadorInterface>(`${environment.apiUrl}/computadores/${computador.id}`, computador);
  }

  remove({ id }: ComputadorInterface): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/computadores/${id}`);
  }
}