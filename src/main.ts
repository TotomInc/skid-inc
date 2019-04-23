import Vue from 'vue';

import App from './App.vue';
import store from './store';

const vm = new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

export default vm;
