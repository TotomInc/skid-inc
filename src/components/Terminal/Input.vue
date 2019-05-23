<template>
  <div id="terminal-input" class="absolute bottom-0 w-full h-12 px-4 py-2 font-mono">
    <div class="flex items-center w-full h-full">
      <span ref="terminal-name" class="text-white text-lg mr-2">{{ player.player.username }}@home $</span>

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

    <autocomplete ref="autocomplete" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { autocomplete } from '@totominc/command-parser';

import Command from '@/models/command.model';
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

  private arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

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

    if (typeof target.textContent === 'string' && !this.ignoredKeys.includes(event.key)) {
      if (this.inputContent !== target.textContent) {
        this.inputContent = target.textContent;

        this.$store.commit(commandMutations.setInputContent, target.textContent);
      }

      if (this.commands.isInAutocomplete) {
        this.$store.commit(commandMutations.hideAutocomplete);
      }
    }

    // Browse command history by increasing the command history index
    if (event.key === 'ArrowUp') {
      this.$store.commit(commandMutations.changeHistoryIndex, 'increase');
    }

    // Browse command history by decreasing the command history index
    if (event.key === 'ArrowDown') {
      this.$store.commit(commandMutations.changeHistoryIndex, 'decrease');
    }

    // Hide autocomplete tooltip when hitting an arrow key
    if (this.arrowKeys.indexOf(event.key) > -1 && this.commands.isInAutocomplete) {
      this.$store.commit(commandMutations.hideAutocomplete);
    }
  }

  /**
   * Event handler when pressing the enter key on the `terminal-input` element.
   * Make sure to update the `cursorPosition` state in case it changed.
   */
  public onInputEnter(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.commands.isInAutocomplete) {
      this.$store.dispatch(commandActions.PARSE_COMMAND, this.inputContent);

      this.cleanInput();
    } else {
      const autocompleteElement = this.$refs.autocomplete as Autocomplete;

      autocompleteElement.autocompleteWord();
    }
  }

  /**
   * Event handler when pressing the tab key on the `terminal-input` element.
   */
  public onInputTab(event: KeyboardEvent): void {
    event.preventDefault();

    const cursorPosition = this.getCursorPosition();
    this.updateCursorPositionState(cursorPosition);

    if (!this.commands.isInAutocomplete) {
      this.$store.commit(commandMutations.showAutocomplete);
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
      this.$store.commit(commandMutations.hideAutocomplete);
    }
  }

  /**
   * Update the terminal-input text state both in DOM, local variables and
   * store. Make sure to update the cursor position.
   */
  public updateInput(text: string, cursorPosition: number): void {
    const inputElement = this.$refs['terminal-input'] as HTMLDivElement;

    this.inputContent = text;
    inputElement.textContent = text;

    this.$store.commit(commandMutations.setInputContent, text);
    this.setCursorPosition(cursorPosition);
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
   * content-editable element. Update the `cursorPosition` state in the store.
   */
  private setCursorPosition(position: number): void {
    const inputElement = this.$refs['terminal-input'] as HTMLDivElement;
    const textInputNode = inputElement.childNodes[0] as Node;
    const range = document.createRange();
    const selection = window.getSelection();

    // In browsers like Firefox, the Selection can be null or have `None` type.
    if (selection && selection.type !== 'None') {
      range.setStart(textInputNode, position);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);

      this.$store.commit(commandMutations.setCursorPosition, position);
    }
  }

  /**
   * Get the cursor position (after each character) on the `terminal-input`
   * content-editable element.
   */
  private getCursorPosition(): number {
    const inputElement = this.$refs['terminal-input'] as HTMLDivElement;
    const selection = window.getSelection();

    let cursorPosition = 0;

    // In browsers like Firefox, the Selection can be null or have `None` type.
    if (selection && selection.type !== 'None' && selection.rangeCount) {
      const range = selection.getRangeAt(0);

      if (range.commonAncestorContainer.parentNode === inputElement) {
        cursorPosition = range.endOffset;
      }
    }

    return cursorPosition;
  }

  /**
   * Update the `cursorPosition` state only if is has changed.
   */
  private updateCursorPositionState(cursorPosition: number): void {
    if (cursorPosition !== this.commands.cursorPosition) {
      this.$store.commit(commandMutations.setCursorPosition, cursorPosition);
    }
  }
}
</script>
