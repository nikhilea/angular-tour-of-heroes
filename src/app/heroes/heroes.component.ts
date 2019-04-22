import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroList } from '../heroList';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  heroes: Hero[];
  // selectedHero: Hero;

  ngOnInit() {
    // this.getHeroes();
    this.getHeroList();
  }

  // Array not supported as subscribed object
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  // }

  getHeroList(): void {
    this.heroService.getHeroList().subscribe(heroeList => this.heroes = heroeList.heroes);
  }

  // Not needed
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        hero.name = name;
        this.heroes.unshift(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
