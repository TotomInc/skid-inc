import { Module } from 'vuex';

import { RootState } from '../state';
import state, { PlayerState } from './player.state';
import actions from './player.actions';
import mutations from './player.mutations';

const module: Module<PlayerState, RootState> = {
  state,
  actions,
  mutations,
};

export default module;
