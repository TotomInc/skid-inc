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

  private ignoredKeys = [9, 13];

  public get player(): PlayerState {
    return this.$store.state.player;
  }

  public get commands(): CommandState {
    return this.$store.state.commands;
  }

  public onInputKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLDivElement;

    if (target && typeof target.textContent === 'string' && !this.ignoredKeys.includes(event.keyCode)) {
      // Avoid unnecessary commit
      if (this.inputContent !== target.textContent) {
        this.inputContent = target.textContent;

        this.$store.commit(commandMutations.setInputContent, target.textContent);
      }

      if (this.commands.isInAutocomplete) {
        this.$store.commit(commandMutations.toggleAutocompletion);
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
      this.$store.commit(commandMutations.toggleAutocompletion);
    } else {
      this.$store.commit(commandMutations.changeSuggestionIndex);
    }
  }

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
