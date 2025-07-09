import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoryDto {
  id: number;
  client: { organization: string };
  status: string;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>('/api/history', {
      params: {
        withClient: 'true'
      }
    });
  }

}
