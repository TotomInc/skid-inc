<template>
  <div
    id="terminal-logs"
    class="w-full sm:w-2/3 md:w-1/2 px-4 py-2 font-mono"
    :style="{ 'height': logHeight }"
  ></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class TerminalLogs extends Vue {
  get logHeight(): string {
    const terminalInput = document.getElementById('terminal-input') as HTMLDivElement;

    return `calc(100% - ${terminalInput.offsetHeight}px)`;
  }
}
</script>
