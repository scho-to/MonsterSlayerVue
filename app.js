const getDmg = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0
    };
  },
  computed: {
    monsterBarStyles(){
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'};
    },
    specialAttackLimiter() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this._doDmg(12, 5);
    },
    attackPlayer() {
      this.playerHealth -= getDmg(15, 8);
    },
    specialAttackMonster() {
      this._doDmg(25, 10);
    },
    healPlayer(){
      this.currentRound++;
      this.playerHealth += getDmg(20, 8);
      if(this.playerHealth > 100) this.playerHealth = 100;
      this.attackPlayer();
    },

    _doDmg(max, min){
      this.currentRound++;
      this.monsterHealth -= getDmg(max, min);
      this.attackPlayer();
    }
  }
}).mount("#game");