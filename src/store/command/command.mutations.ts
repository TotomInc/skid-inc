import { MutationTree } from 'vuex';

import { CommandState } from './command.state';

export const commandMutations = {
  addLog: 'addLog',
  removeLogs: 'removeLogs',

  addCommand: 'addCommand',
  setInputContent: 'setInputContent',
  toggleAutocompletion: 'toggleAutocompletion',
  setSuggestions: 'setSuggestions',

  changeSuggestionIndex: 'changeSuggestionIndex',
  resetSuggestionIndex: 'resetSuggestionIndex',

  changeHistoryIndex: 'changeHistoryIndex',
  resetHistoryIndex: 'resetHistoryIndex',
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

  [commandMutations.setInputContent](state, payload: string) {
    state.inputContent = payload;
  },

  [commandMutations.toggleAutocompletion](state) {
    state.isInAutocomplete = !state.isInAutocomplete;
  },

  [commandMutations.setSuggestions](state, payload: string[]) {
    state.suggestions = payload;
  },

  [commandMutations.changeSuggestionIndex](state) {
    if (state.suggestionIndex >= state.suggestions.length - 1) {
      state.suggestionIndex = 0;
    } else {
      state.suggestionIndex += 1;
    }
  },

  [commandMutations.resetSuggestionIndex](state) {
    state.suggestionIndex = 0;
  },

  [commandMutations.changeHistoryIndex](state, payload: 'increase' | 'decrease') {
    if (payload === 'increase' && state.historyIndex + 1 < state.history.length) {
      state.historyIndex += 1;
    } else if (payload === 'decrease' && state.historyIndex > 0) {
      state.historyIndex -= 1;
    } else {
      state.historyIndex = -1;
    }
  },

  [commandMutations.resetHistoryIndex](state) {
    state.historyIndex = 0;
  },
};

export default mutations;
