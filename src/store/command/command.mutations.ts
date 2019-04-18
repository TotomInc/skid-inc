import { MutationTree } from 'vuex';

import { CommandState } from './command.state';

export const commandMutations = {
  addLog: 'addLog',
  removeLogs: 'removeLogs',

  addCommand: 'addCommand',
};

const mutations: MutationTree<CommandState> = {
  [commandMutations.addLog](state, payload: string) {
    // Remove the oldest log
    if (state.logs.length > 50) {
      state.logs.splice(0, 1);
    }

    state.logs.push(payload);
  },

  [commandMutations.removeLogs](state) {
    state.logs = [];
  },

  [commandMutations.addCommand](state, payload: string) {
    // Remove the oldest command history
    if (state.history.length > 50) {
      state.history.splice(state.history.length - 1, 1);
    }

    state.history.unshift(payload);
  },
};

export default mutations;
