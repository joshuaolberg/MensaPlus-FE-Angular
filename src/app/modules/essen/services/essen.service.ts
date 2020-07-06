import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Essen} from '../model/classes/essen';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EssenService {

  private speisekarteUrl: string;

  constructor(private http: HttpClient) {
    this.speisekarteUrl = 'http://localhost:8080/essen';
  }

  getSpeisekarte(): Observable<Essen[]> {
    return this.http.get<Essen[]>(this.speisekarteUrl);
  }

  getEssenById(id: number): Observable<Essen> {
    const url = `${this.speisekarteUrl}/${id}`;
    return this.http.get<Essen>(url);
  }

  addEssen(essen: Essen): Observable<Essen> {
    return this.http.post<Essen>(this.speisekarteUrl, essen);
  }

  updateEssen(essen: Essen): Observable<any> {
    return this.http.put(this.speisekarteUrl, essen);
  }

  deleteEssenById(essen: Essen | number): Observable<Essen> {
    const id = typeof essen === 'number' ? essen : essen.id;
    const url = `${this.speisekarteUrl}/${id}`;
    return this.http.delete<Essen>(url);
  }
}
