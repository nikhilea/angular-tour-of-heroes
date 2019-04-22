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

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // this.getHeroes();
    this.getHeroList();
  }

  // Array not supported as subscribed object
  // getHeroes(): void {
  //   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  // }

  getHeroList(): void {
      this.heroService.getHeroList().subscribe(heroeList => this.heroes = heroeList.heroes.slice(1, 5));
    }
}
