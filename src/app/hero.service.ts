import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HeroList } from './heroList';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    // private heroesUrl = 'api/heroes';  // URL to web api
    // private heroesUrl = 'file:///C:/Apache/apache-tomcat-docs/test-dir1/test-heroList.json'; //Causing CORS issues
    private heroesUrl = 'http://localhost:8080/test1/test-heroList.json';
    private heroList: HeroList;
    
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(tap(heroes => this.log(`fetched heroes`)), catchError(this.handleError('getHeroes', []])))
  // }
  
  getHeroList(): Observable<HeroList> {
    // return of(new HeroList(HEROES));
    return this.http.get<HeroList>(this.heroesUrl)
        .pipe(tap(heroList => {
                                this.log(`fetched ${heroList.heroes.length} heroes`);
                                this.heroList = heroList
                              }
                  ), 
              catchError(this.handleError('getHeroList', new HeroList(HEROES))));
  }

  getHero(id: number): Observable<Hero> {
    // return of(HEROES.find(hero => hero.id === id));
    let hero: Hero = this.heroList.heroes.find(hero => hero.id === id);
    this.messageService.add(`HeroService: fetched hero id=${hero.id}`);
    return of(hero);
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    this.log(`adding hero ${hero.name}`);
    
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero ${hero.name} with id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    this.log(`deleting hero with id=${id}`);

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
