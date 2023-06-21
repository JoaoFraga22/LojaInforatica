import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteInterface } from '../types/cliente.interface';

@Injectable()
export class ClienteService {
  constructor(private httpClient: HttpClient) { }

  getCliente(id: number): Observable<ClienteInterface> {
    return this.httpClient.get<ClienteInterface>(
      `${environment.apiUrl}/clientes/${id}`
    )
  }

  getClientes(): Observable<ClienteInterface[]> {
    return this.httpClient.get<ClienteInterface[]>(
      `${environment.apiUrl}/clientes`
    );
  }

  update(cliente: ClienteInterface): Observable<ClienteInterface> {
    return this.httpClient.put<ClienteInterface>(
      `${environment.apiUrl}/clientes/${cliente.id}`,
      cliente
    )
  }

  save(cliente: ClienteInterface): Observable<ClienteInterface> {
    return this.httpClient.post<ClienteInterface>(
      `${environment.apiUrl}/clientes`,
      cliente
    );
  }

  remove(cliente: ClienteInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/clientes/${cliente.id}`
    );
  }
}