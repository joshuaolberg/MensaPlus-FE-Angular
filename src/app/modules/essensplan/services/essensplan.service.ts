import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Essensplan} from '../model/classes/essensplan';
import {Essen} from '../../essen/model/classes/essen';

@Injectable({
  providedIn: 'root'
})

export class EssensplanService {

  private essensplanUrl: string;

  constructor(private http: HttpClient) {
    this.essensplanUrl = 'http://localhost:8080/essensplan';
  }

  getEssensplan(): Observable<Essensplan[]> {
    return this.http.get<Essensplan[]>(this.essensplanUrl);
  }

  getEssensplanById(id: number): Observable<Essensplan> {
    const url = `${this.essensplanUrl}/${id}`;
    return this.http.get<Essensplan>(url);
  }

  addEssensplan(essensplan: Essensplan): Observable<any> {
    return this.http.post<Essensplan>(this.essensplanUrl, essensplan);
  }

  updateEssen(essensplan: Essensplan) {
    return this.http.put(this.essensplanUrl, essensplan);
  }

  deleteEssensplanById(essensplan: Essensplan | number): Observable<Essensplan> {
    const id = typeof essensplan === 'number' ? essensplan : essensplan.id;
    const url = `${this.essensplanUrl}/${id}`;
    return this.http.delete<Essensplan>(url);
  }

  addEssenToEssensplan(essensplan: Essensplan | number, essen: Essen | number, wochentag: number): Observable<Essen> {
    const essensplanId = typeof essensplan === 'number' ? essensplan : essensplan.id;
    const essenId = typeof essen === 'number' ? essen : essen.id;

    const url = `${this.essensplanUrl}/${essensplanId}/add/${essenId}/wt=${wochentag}`;
    return this.http.post<Essen>(url, essenId);
  }

  deleteEssenFromEssensplan(essensplan: Essensplan, essen: Essen | number, wochentag: number): Observable<Essen> {
    const essensplanId = typeof essensplan === 'number' ? essensplan : essensplan.id;
    const essenId = typeof essen === 'number' ? essen : essen.id;

    const url = `${this.essensplanUrl}/${essensplanId}/delete/${essenId}/wt=${wochentag}`;
    return this.http.delete<Essen>(url);
  }
}

