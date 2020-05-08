import { Injectable } from '@angular/core';
import { serverUrl } from '../constant/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategorySelect = (): Observable<category[]> => {
    const url = `${serverUrl}categories/select`;
    return this.http.get<category[]>(url);
  }
}
