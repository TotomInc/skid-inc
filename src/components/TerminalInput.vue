<template>
  <div id="terminal-input" class="flex items-center absolute pin-b w-full h-12 px-4 py-2 font-mono">
    <span class="text-white text-lg mr-2">user@rpi $</span>

    <div
      ref="terminal-input"
      class="flex-1 text-white text-lg outline-none"
      contenteditable="true"
      @keydown="onInputKeyup($event)"
      @keydown.enter="onInputEnter($event)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { commandActions } from '@/store/command/command.actions';

@Component({})
export default class TerminalInput extends Vue {
  public inputContent: string = '';

  public onInputKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLDivElement;

    if (target && typeof target.textContent === 'string') {
      this.inputContent = target.textContent;
    }
  }

  public onInputEnter(event: KeyboardEvent): void {
    event.preventDefault();

    this.$store.dispatch(commandActions.PARSE_COMMAND, this.inputContent);

    this.cleanInput();
  }

  private cleanInput(): void {
    const input = this.$refs['terminal-input'] as HTMLDivElement;

    this.inputContent = '';
    input.textContent = '';
    input.innerHTML = '';
  }
}
</script>
