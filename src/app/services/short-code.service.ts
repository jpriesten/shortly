import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs-compat/operator/timeout';

@Injectable({
  providedIn: 'root',
})
export class ShortCodeService {
  public baseUrl = 'https://api.shrtco.de/v2';
  public httpTimeout = 3000;
  public httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      }),
    };
  }

  /** POST: shorten a url */
  shortenUrl(data: string): Promise<any> {
    let url = `${this.baseUrl}/shorten?url=${data}`;

    let params = {};

    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe({
        next: (res) => {
          console.log('Success: ', res);
          resolve(res.result);
        },
        error: (err) => {
          console.log('Error: ', err);
          reject(err);
        },
        complete: () => {
          console.log('Comepleted');
        },
      });
    });
  }
}
