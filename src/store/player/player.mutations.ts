import { MutationTree } from 'vuex';

import { PlayerState } from './player.state';

export const playerMutations = {
  editUsername: 'editUsername',

  addLevel: 'addLevel',
  setExperienceRequired: 'setExperienceRequired',

  addMoney: 'addMoney',
  removeMoney: 'removeMoney',

  addExperience: 'addExperience',
  removeExperience: 'removeExperience',
};

const mutations: MutationTree<PlayerState> = {
  [playerMutations.editUsername](state, payload: string) {
    state.player.username = payload;
  },

  [playerMutations.addLevel](state) {
    state.player.experience -= state.player.experienceRequired;
    state.player.level += 1;
  },

  [playerMutations.setExperienceRequired](state) {
    state.player.experienceRequired = Math.floor(100 * Math.pow(1.5, state.player.level + 1));
  },

  [playerMutations.addMoney](state, payload: number) {
    state.player.money += payload;
  },

  [playerMutations.removeMoney](state, payload: number) {
    state.player.money -= payload;
  },

  [playerMutations.addExperience](state, payload: number) {
    state.player.experience += payload;
  },

  [playerMutations.removeExperience](state, payload: number) {
    state.player.experience -= payload;
  },
};

export default mutations;
