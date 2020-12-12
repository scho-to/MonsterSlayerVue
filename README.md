# MonsterSlayerVue
Game made with Vue, based on the Udemy-Course Project in this course: Vue - The Complete Guide (w/ Router, Vuex, Composition API)

You can play the game with the current state at this repl:
[https://MonsterSlayerVue.tobiasschotenrh.repl.co](https://MonsterSlayerVue.tobiasschotenrh.repl.co)

## How to use
You can use this simple Game in your own script.

1. Download the Sources of this app
2. In your <head>, include the app.js supplied by this app with the vue js library. You can rename the app.js of course:
  ```html
  <script src="https://unpkg.com/vue@next" defer></script>
  <script src="app.js" defer></script>
  ```
3. Also include the stylings, if you dont want to create your own styling for the game. You can also rename the styles.css:
  ```html
  <link rel="stylesheet" href="styles.css" />
  ```
4. Insert the required HTML Elementes:
  ```html
  <div id="game">
    <section id="monster" class="container">
      <h2>Monster Health</h2>
      <div class="healthbar">
        <div class="healthbar__value" :style="monsterBarStyles"></div>
      </div>
    </section>
    <section id="player" class="container">
      <h2>Your Health</h2>
      <div class="healthbar">
        <div class="healthbar__value" :style="playerBarStyles"></div>
      </div>
    </section>
    <section class="container" v-if="winner">
      <h2>Game Over!</h2>
      <h3 v-if="winner === 'monster'">You lost!</h3>
      <h3 v-else-if="winner === 'player'">You won!</h3>
      <h3 v-else-if="winner === 'draw'">It's a draw!</h3>
      <button @click="resetGame">Restart the Game</button>
    </section>
    <section id="controls" v-if="!winner">
      <button @click="attackMonster">ATTACK</button>
      <button :disabled="specialAttackLimiter" @click="specialAttackMonster">SPECIAL ATTACK</button>
      <button @click="healPlayer">HEAL</button>
      <button @click="surrender">SURRENDER</button>
    </section>
    <section id="log" class="container" v-if="logs.length >= 1">
      <h2>Battle Log</h2>
      <ul>
        <li v-for="log in logs">
          {{log}}
        </li>
      </ul>
    </section>
  </div>
  ```
  
Have fun and play!
