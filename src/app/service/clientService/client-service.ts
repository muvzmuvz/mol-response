import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ClientDto {
  id?: number;
  route: {
    id: number;
    title: string;
  };
  organization: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  comment: string;
}

export interface CreateClientDto {
  routeTitle: string;
  organization: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>('http://localhost:3000/clients');
  }

  addRoute(dto: CreateClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>('http://localhost:3000/clients', dto);
  }

  updateRoute(id: number, dto: Partial<CreateClientDto>): Observable<ClientDto> {
    return this.http.patch<ClientDto>(`http://localhost:3000/clients/${id}`, dto);
  }
  deleteRoute(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:3000/clients/${id}`);
}
}