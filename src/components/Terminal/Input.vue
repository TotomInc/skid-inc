<template>
  <div id="terminal-input" class="absolute pin-b w-full h-12 px-4 py-2 font-mono">
    <div class="flex items-center w-full h-full">
      <span ref="terminal-name" class="text-white text-lg mr-2">{{player.player.username}}@home $</span>

      <div
        ref="terminal-input"
        class="flex-1 text-white text-lg outline-none"
        contenteditable="true"
        @keydown="onInputKeyup($event)"
        @keydown.enter="onInputEnter($event)"
        @keydown.tab="onInputTab($event)"
        @keydown.esc="onInputEsc($event)"
      />
    </div>

    <div
      id="autocomplete-tooltip"
      ref="autocomplete-tooltip"
      class="z-10 hidden absolute rounded py-2 px-4 opacity-0 pointer-events-none text-grey-darkest bg-white"
    >
      <p v-for="(suggestion, index) in suggestions" :key="'suggestion-' + index">{{suggestion}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { autocomplete } from '@totominc/command-parser';

import { commandActions } from '@/store/command/command.actions';
import { PlayerState } from '@/store/player/player.state';
import { Command } from '@/models/command.model';
import { CommandState } from '../../store/command/command.state';
import { commandMutations } from '../../store/command/command.mutations';

@Component({})
export default class TerminalInput extends Vue {
  public inputContent = '';
  public suggestions: string[] = [];

  public get player(): PlayerState {
    return this.$store.state.player;
  }

  public get commands(): CommandState {
    return this.$store.state.commands;
  }

  public onInputKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLDivElement;

    if (target && typeof target.textContent === 'string') {
      // Avoid unnecessary commit
      if (this.inputContent !== target.textContent) {
        this.inputContent = target.textContent;
        this.$store.commit(commandMutations.setInputContent, target.textContent);
      }

      if (this.commands.isInAutocomplete) {
        this.hideAutocomplete();
      }
    }
  }

  public onInputEnter(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.commands.isInAutocomplete) {
      this.$store.dispatch(commandActions.PARSE_COMMAND, this.inputContent);

      this.cleanInput();
    }
  }

  public onInputTab(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.commands.isInAutocomplete) {
      this.showAutocomplete();
    }
  }

  public onInputEsc(event: KeyboardEvent): void {
    if (this.commands.isInAutocomplete) {
      this.hideAutocomplete();
    }
  }

  private showAutocomplete(): void {
    const suggestions = autocomplete<Command>(this.inputContent, this.commands.commands);

    this.suggestions = suggestions;

    const autocompleteElement = this.$refs['autocomplete-tooltip'] as HTMLDivElement;
    const terminalNameElement = this.$refs['terminal-name'] as HTMLSpanElement;
    const terminalInputElement = this.$refs['terminal-input'] as HTMLDivElement;

    autocompleteElement.style.display = 'block';
    autocompleteElement.style.pointerEvents = 'auto';

    // Monospaced fonts have fixed width on each letter: 16px of font-size
    // + 4.5px of spacing between each letter
    const lettersToPixels = (terminalInputElement.innerText.length * 21.5) / 2;
    const autocompleteElementWidth = autocompleteElement.offsetWidth / 2;

    const leftPosition = terminalNameElement.offsetWidth + 24 + lettersToPixels - autocompleteElementWidth;
    const topPosition = 1 + suggestions.length * 1.1;

    autocompleteElement.style.left = `${leftPosition}px`;
    autocompleteElement.style.top = `-${topPosition}rem`;

    // Set an immediate timeout to avoid the tooltip moving from a point A to
    // a point B in the X axis
    setTimeout(() => {
      autocompleteElement.style.transition = '0.25s ease-in-out all';
      autocompleteElement.style.transform = 'matrix(1, 0, 0, 1, 0, 5)';
      autocompleteElement.style.opacity = '1';

      this.$store.commit(commandMutations.toggleAutocompletion);
    }, 0);
  }

  private hideAutocomplete(): void {
    const autocompleteElement = this.$refs['autocomplete-tooltip'] as HTMLDivElement;

    autocompleteElement.style.transform = 'matrix(1, 0, 0, 1, 0, -5)';
    autocompleteElement.style.opacity = '0';

    setTimeout(() => {
      autocompleteElement.style.display = 'none';
      autocompleteElement.style.pointerEvents = 'none';
      autocompleteElement.style.transition = 'none';

      this.$store.commit(commandMutations.toggleAutocompletion);
    }, 250);
  }

  private cleanInput(): void {
    const input = this.$refs['terminal-input'] as HTMLDivElement;

    this.inputContent = '';
    input.textContent = '';
    input.innerHTML = '';
  }
}
</script>

<style scoped>
#autocomplete-tooltip:after {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: ' ';
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #ffffff;
  border-width: 6px;
  margin-left: -6px;
}
</style>
