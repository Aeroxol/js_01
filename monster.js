export default class Monster {
    constructor() {
      this.maxHp = 10;
      this.hp = 10;
      this.atkMax = 2;
      this.atkMin = 1;
      this.def = 0;
      this.exp = 3;
      this.speed = 10;
      this.gold = 3;
    }
  
    attack() {
      // 몬스터의 공격
      return Math.floor(this.atkMin + Math.random() * (this.atkMax - this.atkMin));
    }
  
    levelup() {
      this.maxHp += Math.floor(3 + 2 * Math.random()); // 3 or 4
      var min = 2 * Math.random();
      this.atkMax += Math.floor(min + Math.random()); // 0 ~ 2
      this.atkMin += Math.floor(min); // 0 or 1
      this.def += Math.floor(1.5 * Math.random()); // 0 or 1
      this.exp += 2;
      this.hp = this.maxHp;
    }
  }