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
import parse, { Command } from '@totominc/command-parser';

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
  get commands(): CommandState {
    return this.$store.state.commands;
  }
}
</script>

<style lang="postcss" scoped>
@import 'assets/styles/tailwind.postcss';
</style>
