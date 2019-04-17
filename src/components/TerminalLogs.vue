<template>
  <div
    id="terminal-logs"
    class="w-full sm:w-2/3 md:w-1/2 px-4 py-2 font-mono"
    :style="{ 'height': logsHeight }"
  ></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class TerminalLogs extends Vue {
  private logsHeight: string = '100%';

  mounted(): void {
    this.calculateHeight();
  }

  private calculateHeight(): void {
    const terminalInput = document.getElementById('terminal-input') as HTMLDivElement;

    this.logsHeight = `calc(100% - ${terminalInput.offsetHeight}px)`;
  }
}
</script>
