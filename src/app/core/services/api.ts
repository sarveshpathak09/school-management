import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly baseUrl = environment.apiUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  // <T> is a generic type that can be any type of data that the API returns
  //  placeholder, dynamic type
  get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined | null>,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), {
      params: this.toHttpParams(params),
      headers: this.toHttpHeaders(headers),
    });
  }

  post<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body, {
      headers: this.toHttpHeaders(headers),
    });
  }

  put<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body, {
      headers: this.toHttpHeaders(headers),
    });
  }

  patch<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.patch<T>(this.buildUrl(path), body, {
      headers: this.toHttpHeaders(headers),
    });
  }

  delete<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined | null>,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), {
      params: this.toHttpParams(params),
      headers: this.toHttpHeaders(headers),
    });
  }

  private buildUrl(path: string): string {
    const trimmed = path.replace(/^\/+/, '');
    return `${this.baseUrl}/${trimmed}`;
  }

  private toHttpHeaders(headers?: Record<string, string>): HttpHeaders | undefined {
    if (!headers) return undefined;
    return new HttpHeaders(headers);
  }

  private toHttpParams(
    params?: Record<string, string | number | boolean | undefined | null>
  ): HttpParams | undefined {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }
}
