export default class Player {
    constructor() {
      this.hp = 20;
      this.maxHp = 20;
      this.atkMax = 2;
      this.atkMin = 2;
      this.def = 0;
      this.criticalChance = 0.1;
      this.runChance = 0.5;
      this._exp = 0;
      this.level = 1;
      this.upgrade = 1;
      this.speed = 10;
    }
  
    get exp() {
      return this._exp;
    }
  
    set exp(value) {
      this._exp += value;
      if (this._exp >= this.expReq) {
        this._exp -= this.expReq;
        this.level++;
        this.maxHp += 2;
        this.upgrade++;
        console.log(`\n레벨업!\n`);
      }
    }
  
    get expReq() {
      return 4 + 2 * this.level;
    }
  
    attack() {
      // 플레이어의 공격
      if (Math.random() < this.criticalChance) {
        return Math.floor(this.atkMin + Math.random() * (this.atkMax - this.atkMin)) * 2;
      }
      return Math.floor(this.atkMin + Math.random() * (this.atkMax - this.atkMin));
    }
  
    run() {
      if (Math.random() < this.runChance) {
        return true;
      } else {
        return false;
      }
    }
  }