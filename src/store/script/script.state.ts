import { Script } from '@/models/script.model';

export interface ScriptState {
  scripts: Script[];
}

const state: ScriptState = {
  scripts: [
    {
      name: 'hare.ctx',
      unlockPrice: 0,
      price: 520,
      inflation: 1.25,
      duration: 4,
      progression: 0,
      level: 1,
      unlocked: false,
      triggered: false,
      executed: 0,
      income: {
        money: 118,
        exp: 8,
      },
    },
  ],
};

export default state;
