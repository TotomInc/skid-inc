import Vue from 'vue';
import { Store } from 'vuex';

import { RootState } from '@/store/state';

class Game {
  /** Reference to the root Vue instance */
  private rootVM: Vue;

  /** Reference to the Vuex store from the root Vue instance */
  private store: Store<RootState>;

  private fps: number = 30;
  private interval!: number;
  private before!: number;
  private now!: number;
  private loopRef!: number;

  constructor(vm: Vue) {
    this.rootVM = vm;
    this.store = vm.$store;
  }

  /**
   * Initialize the game loop with default values.
   */
  public initialize(): void {
    this.interval = 1000 / this.fps;

    this.now = new Date().getTime();
    this.before = new Date().getTime();

    this.loopRef = window.setInterval(() => this.loop(), this.interval);
  }

  /**
   * Clear the game loop interval, without clearing the state of the game.
   */
  public stop(): void {
    window.clearInterval(this.loopRef);
  }

  /**
   * Core game loop, calculates the delta time with the last run and
   * determinate the number of times to update the game (prevent progression
   * lost when the tab is not focused).
   */
  private loop(): void {
    this.now = new Date().getTime();

    const elapsed = this.now - this.before;
    const times = Math.floor(elapsed / this.interval);

    elapsed > this.interval ? this.update(times) : this.update(1);

    this.before = new Date().getTime();
  }

  /**
   * Update every single game logic that depends on the core game loop.
   *
   * @param times number of frames lost aka. a complete cycle of fps lost
   */
  private update(times: number): void {}
}

export default Game;
