<template>
  <div id="terminal-input" class="absolute pin-b w-full h-12 px-4 py-2 font-mono">
    <div class="flex items-center w-full h-full">
      <span ref="terminal-name" class="text-white text-lg mr-2">{{player.player.username}}@home $</span>

      <div
        ref="terminal-input"
        class="flex-1 text-white text-lg outline-none"
        contenteditable="true"
        @keyup="onInputKeyup($event)"
        @keydown.enter="onInputEnter($event)"
        @keydown.tab="onInputTab($event)"
        @keydown.esc="onInputEsc($event)"
      />
    </div>

    <autocomplete/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { autocomplete } from '@totominc/command-parser';

import { Command } from '@/models/command.model';
import { PlayerState } from '@/store/player/player.state';
import { CommandState } from '@/store/command/command.state';
import { commandActions } from '@/store/command/command.actions';
import { commandMutations } from '@/store/command/command.mutations';
import Autocomplete from './Autocomplete.vue';

@Component({
  components: {
    Autocomplete,
  },
})
export default class TerminalInput extends Vue {
  public inputContent = '';
  public suggestions: string[] = [];

  private ignoredKeys = [
    'Tab',
    'Shift',
    'CapsLock',
    'Control',
    'Alt',
    'Meta',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ];

  public get player(): PlayerState {
    return this.$store.state.player;
  }

  public get commands(): CommandState {
    return this.$store.state.commands;
  }

  public mounted(): void {
    const that = this;

    this.$store.subscribe(({ type, payload }) => {
      if (type === commandMutations.changeHistoryIndex) {
        const historyCommand: string | undefined = this.commands.history[this.commands.historyIndex];

        if (historyCommand) {
          const inputElement = this.$refs['terminal-input'] as HTMLDivElement;

          inputElement.textContent = historyCommand;
          this.inputContent = historyCommand;
          this.$store.commit(commandMutations.setInputContent, historyCommand);
          this.setCursorPosition(historyCommand.length);
        } else {
          this.cleanInput();
        }
      }
    });
  }

  /**
   * Default event handler when pressing a key on the `terminal-input` element.
   * Some keys are ignored (modifiers, meta, ...) from this event handler.
   */
  public onInputKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLDivElement;

    if (target && typeof target.textContent === 'string' && !this.ignoredKeys.includes(event.key)) {
      // Avoid unnecessary commit
      if (this.inputContent !== target.textContent) {
        this.inputContent = target.textContent;

        this.$store.commit(commandMutations.setInputContent, target.textContent);
      }

      if (this.commands.isInAutocomplete) {
        this.$store.commit(commandMutations.toggleAutocompletion);
      }
    }

    if (event.key === 'ArrowUp') {
      this.$store.commit(commandMutations.changeHistoryIndex, 'increase');
    }

    if (event.key === 'ArrowDown') {
      this.$store.commit(commandMutations.changeHistoryIndex, 'decrease');
    }
  }

  /**
   * Event handler when pressing the enter key on the `terminal-input` element.
   */
  public onInputEnter(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.commands.isInAutocomplete) {
      this.$store.dispatch(commandActions.PARSE_COMMAND, this.inputContent);

      this.cleanInput();
    }
  }

  /**
   * Event handler when pressing the tab key on the `terminal-input` element.
   */
  public onInputTab(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.commands.isInAutocomplete) {
      this.$store.commit(commandMutations.toggleAutocompletion);
    } else {
      this.$store.commit(commandMutations.changeSuggestionIndex);
    }
  }

  /**
   * Event handler when pressing the escape key on the `terminal-input`
   * element.
   */
  public onInputEsc(event: KeyboardEvent): void {
    if (this.commands.isInAutocomplete) {
      this.$store.commit(commandMutations.toggleAutocompletion);
    }
  }

  /**
   * Remove all input content from the local variable, DOM and store.
   */
  private cleanInput(): void {
    const input = this.$refs['terminal-input'] as HTMLDivElement;

    input.textContent = '';
    input.innerHTML = '';
    this.inputContent = '';
    this.$store.commit(commandMutations.setInputContent, '');
  }

  /**
   * Set the cursor to the desired position on the `terminal-input`
   * content-editable element.
   */
  private setCursorPosition(position: number): void {
    const inputElement = this.$refs['terminal-input'] as HTMLDivElement;
    const textInputNode = inputElement.childNodes[0] as Node;
    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(textInputNode, position);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  }
}
</script>
