<template>
  <div id="app" class="relative w-screen h-screen bg-grey-darkest">
    <logo-wrapper />

    <div id="terminal-wrapper" class="w-full h-full">
      <terminal-logs />
      <terminal-input />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import parse, { Command } from '@totominc/command-parser';

import Game from '@/game/core';
import LogoWrapper from '@/components/LogoWrapper.vue';
import TerminalLogs from '@/components/Terminal/Logs.vue';
import TerminalInput from '@/components/Terminal/Input.vue';
import { CommandState } from '@/store/command/command.state';

@Component({
  components: {
    LogoWrapper,
    TerminalLogs,
    TerminalInput,
  },
})
export default class App extends Vue {
  private game: Game;

  constructor() {
    super();

    this.game = new Game(this.$root);
  }

  public mounted(): void {
    this.game.initialize();
  }
}
</script>

<style lang="postcss" scoped>
@import 'assets/styles/tailwind.postcss';
</style>
