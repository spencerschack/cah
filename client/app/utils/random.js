import 'npm:seedrandom';

class Random {

  constructor(...seeds) {
    const seed = seeds.join('');
    this.rng = seed ? new Math.seedrandom(seed) : Math.random;
  }

  range(min, max) {
    return (this.rng() * (max - min)) + min
  }

}

export default function random(...seeds) {
  return new Random(...seeds);
}
