import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl: string = environment.baseUrl + "/api/Producto/"

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}`);
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}${id}`);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}`, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, producto);
  }

}
