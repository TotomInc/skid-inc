import { Module } from 'vuex';

import { RootState } from '../state';
import state, { ScriptState } from './script.state';
import actions from './script.actions';
import mutations from './script.mutations';

const module: Module<ScriptState, RootState> = {
  state,
  actions,
  mutations,
};

export default module;
