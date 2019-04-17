import { Module } from 'vuex';

import { RootState } from '../state';
import state, { CommandState } from './command.state';
import actions from './command.actions';
import mutations from './command.mutations';

const module: Module<CommandState, RootState> = {
  state,
  actions,
  mutations,
};

export default module;
