import { Hero } from './hero';

export class HeroList {
    heroes: Hero[];

    constructor(heroes: Hero[]) { 
        this.heroes = heroes;
    }
}
