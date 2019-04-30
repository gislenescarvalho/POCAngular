import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../model/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
      tap(Users => console.log(`fetched Users`)),
      catchError(this.handleError('getUsers', []))
      );
  }

  /** GET User by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
      map(Users => Users[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        console.log(`${outcome} User id=${id}`);
      }),
      catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?name=${term}`).pipe(
      tap(_ => console.log(`found  users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
