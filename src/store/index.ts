import Vue from 'vue';
import Vuex from 'vuex';

import { RootState } from './state';
import commands from './command';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    commands,
  },
});

export default store;
