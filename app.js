const getDmg = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logs: []
    };
  },
  computed: {
    monsterBarStyles(){
      if (this.monsterHealth < 0) return {width: '0%'};
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      if (this.playerHealth < 0) return {width: '0%'};
      return {width: this.playerHealth + '%'};
    },
    specialAttackLimiter() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value){
      if (value <= 0 && this.monsterHealth <= 0){
        //draw
        this.winner = "draw";
      } else if(value <= 0) {
        //you lost!
        this.winner = "monster";
      }
    },
    monsterHealth(value){
      if (value <= 0 && this.playerHealth <= 0){
        //draw
        this.winner = "draw";
      } else if(value <= 0) {
        //you won!
        this.winner = "player";
      }
    }
  },
  methods: {
    attackMonster() {
      this._doDmg(12, 5);
      this._log("Player attacks Monster");
    },
    attackPlayer() {
      this.playerHealth -= getDmg(15, 8);
      this._log("Monster attacks Player");
    },
    specialAttackMonster() {
      this._doDmg(25, 10);
      this._log("Player attacks Monster");
    },
    healPlayer(){
      this.currentRound++;
      this.playerHealth += getDmg(20, 8);
      if(this.playerHealth > 100) this.playerHealth = 100;
      this.attackPlayer();
      this._log("Player heals");
    },
    surrender() {
      this.playerHealth = 0;
      this._log("Player surrenders");
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this._log("Game has been reset");
    },


    _doDmg(max, min){
      this.currentRound++;
      this.monsterHealth -= getDmg(max, min);
      this.attackPlayer();
    },
    _log(message){
      this.logs.unshift("Round " + this.currentRound + ": " + message);
      setTimeout(() => {
        this.logs.pop();
      }, 3000);
    }
  }
}).mount("#game");