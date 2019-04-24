import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  public saveUsername: boolean = true;
  public removeUsername: boolean = false;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // this.getHeroes();
    this.getHeroList();
    console.log('Begin DashboardComponent.ngOnInit');
    console.log('saveUsername is ' + this.saveUsername);
    console.log('removeUsername is ' + this.removeUsername);
  }

  public onSaveUsernameChanged(value: boolean){
    this.saveUsername = value;
    console.log('saveUsername changed to ' + this.saveUsername);

    this.removeUsername = !value;
    console.log('removeUsername changed to ' + this.removeUsername);
  }

  public onRemoveUsernameChanged(value: boolean){
    this.saveUsername = !value;
    console.log('saveUsername changed to ' + this.saveUsername);

    this.removeUsername = value;
    console.log('removeUsername changed to ' + this.removeUsername);
  }

  // Array not supported as subscribed object
  // getHeroes(): void {
  //   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  // }

  getHeroList(): void {
      this.heroService.getHeroList().subscribe(heroeList => this.heroes = heroeList.heroes.slice(1, 5));
    }
}
