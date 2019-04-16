<template>
  <div id="app" class="w-screen h-screen bg-grey-darkest">
    <div id="terminal-wrapper" class="w-full h-full">
      <terminal-input/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import TerminalInput from './components/TerminalInput.vue';

@Component({
  components: {
    TerminalInput,
  },
})
export default class App extends Vue {}
</script>

<style lang="postcss" scoped>
@import 'assets/styles/tailwind.postcss';
</style>
