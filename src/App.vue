<template>
  <div id="app" class="relative w-screen h-screen bg-grey-darkest">
    <logo-wrapper/>

    <div id="terminal-wrapper" class="w-full h-full">
      <terminal-logs/>
      <terminal-input/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import parse, { setCommands, Command, getCommands } from '@totominc/command-parser';

import LogoWrapper from '@/components/LogoWrapper.vue';
import TerminalLogs from '@/components/TerminalLogs.vue';
import TerminalInput from '@/components/TerminalInput.vue';
import { CommandState } from './store/command/command.state';

@Component({
  components: {
    LogoWrapper,
    TerminalLogs,
    TerminalInput,
  },
})
export default class App extends Vue {
  /**
   * Before mounting the app, register the commands from the app state into the
   * parser module.
   */
  beforeMount() {
    setCommands(this.commands.commands);
  }

  get commands(): CommandState {
    return this.$store.state.commands;
  }
}
</script>

<style lang="postcss" scoped>
@import 'assets/styles/tailwind.postcss';
</style>
