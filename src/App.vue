<template>
  <div id="app" class="w-screen h-screen bg-grey-darkest">
    <div id="terminal-wrapper" class="w-full h-full">
      <terminal-logs/>
      <terminal-input/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import TerminalLogs from '@/components/TerminalLogs.vue';
import TerminalInput from '@/components/TerminalInput.vue';

@Component({
  components: {
    TerminalLogs,
    TerminalInput,
  },
})
export default class App extends Vue {}
</script>

<style lang="postcss" scoped>
@import 'assets/styles/tailwind.postcss';
</style>
