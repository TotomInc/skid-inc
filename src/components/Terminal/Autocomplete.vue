<template>
  <div id="autocomplete-tooltip">
    <div
      id="tooltip"
      ref="tooltip"
      class="z-10 absolute -top-4 rounded p-2 opacity-0 pointer-events-none text-gray-800 bg-white shadow-xl"
    >
      <div v-if="suggestions.length">
        <p
          v-for="(suggestion, index) in suggestions"
          :key="'suggestion-' + index"
          :class="{ 'bg-gray-400': commands.suggestionIndex === index }"
          class="transition px-2 py-1 rounded text-base"
        >
          {{ suggestion }}
        </p>
      </div>

      <span v-else class="text-base">No suggestions</span>
    </div>

    <!--
      Thoses are fake elements, they are needed to calculate both the width of
      the text input and the height of the suggestions. It doesn't interfere
      with other DOM elements.
    -->
    <div>
      <span ref="text-input-ruler" class="absolute pointer-events-none top-4 text-lg"></span>
      <div ref="suggestions-ruler" class="absolute opacity-0 pointer-events-none text-base"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { autocomplete } from '@totominc/command-parser';

import TerminalInput from './Input.vue';
import Command from '@/models/command.model';
import { CommandState } from '@/store/command/command.state';
import { commandMutations } from '@/store/command/command.mutations';

/**
 * The autocomplete component must be used as a child of the Input component,
 * otherwise it won't work because it depends of this parent (using Input's
 * `$refs`).
 */
@Component({})
export default class TerminalAutocomplete extends Vue {
  public suggestions: string[] = [];

  public get commands(): CommandState {
    return this.$store.state.commands;
  }

  /**
   * When component is mounted, listen for a specific mutation to trigger the
   * autocomplete tooltip.
   */
  public mounted(): void {
    this.$store.subscribe(({ type, payload }) => {
      if (type === commandMutations.showAutocomplete) {
        this.showAutocomplete();
      }

      if (type === commandMutations.hideAutocomplete) {
        this.hideAutocomplete();
      }
    });
  }

  /**
   * Autocomplete the current word where the `caretPosition` is. Try to find
   * already written characters, execute a string substitution with the
   * suggestion and update the input-text (both in the store and DOM).
   */
  public autocompleteWord(): void {
    const terminalInputComponent = this.$parent as TerminalInput;
    const splittedInputcontent = this.commands.inputContent.split(' ');
    const selectedSuggestion = this.commands.suggestions[this.commands.suggestionIndex];
    const { cursorPosition } = this.commands;
    const { typedWord, charsBeforeWord } = this.getWordOnCursorPosition();

    splittedInputcontent.splice(splittedInputcontent.indexOf(typedWord), 1, selectedSuggestion);

    const inputText = splittedInputcontent.join(' ');
    const newCursorPosition = charsBeforeWord.length + selectedSuggestion.length;

    terminalInputComponent.updateInput(inputText, newCursorPosition);

    this.$store.commit(commandMutations.hideAutocomplete);

    this.hideAutocomplete();
  }

  /**
   * Find the current word where the cursor position is located (based on the
   * store state).
   */
  private getWordOnCursorPosition(): {
    typedWord: string;
    charsBeforeWord: string;
  } {
    const { inputContent, cursorPosition } = this.commands;

    let charsAfterCursor = '';
    let charsBeforeCursor = '';

    // Go forward after the cursor position to match the next space which
    // delimit words
    for (let i = cursorPosition; i < inputContent.length - 1; i += 1) {
      const char = inputContent[i];

      if (char !== ' ') {
        charsAfterCursor += char;
      } else {
        i = inputContent.length;
      }
    }

    // Go backward before the cursor position to match the first space which
    // delimite words. Also make sure to unshift the new char (instead of
    // pushing, unlike `charsAfterCursor`)
    for (let i = cursorPosition - 1; i >= 0; i -= 1) {
      const char = inputContent[i];

      if (char !== ' ') {
        charsBeforeCursor = `${char}${charsBeforeCursor}`;
      } else {
        i = 0;
      }
    }

    const typedWord = charsBeforeCursor + charsAfterCursor;
    const charsBeforeWord = inputContent.substring(0, inputContent.indexOf(typedWord));

    return {
      typedWord,
      charsBeforeWord,
    };
  }

  /**
   * Call the `autocomplete` function from the command-parser to retrieve and
   * store an array of all suggestions (both in the component and store).
   * Make sure to get suggestions up to where the cursor is located in the
   * input.
   */
  private setSuggestions(): string[] {
    const { cursorPosition, inputContent } = this.commands;
    const revelantInputPart = inputContent.substr(0, cursorPosition);
    const suggestions = autocomplete<Command>(revelantInputPart, this.commands.commands);

    this.suggestions = suggestions;
    this.$store.commit(commandMutations.setSuggestions, suggestions);

    return suggestions;
  }

  /**
   * Remove any content from the rulers.
   */
  private clearRulers(): void {
    const textInputRulerEl = this.$refs['text-input-ruler'] as HTMLSpanElement;
    const suggestionsRulerEl = this.$refs['suggestions-ruler'] as HTMLDivElement;

    textInputRulerEl.innerHTML = '';
    suggestionsRulerEl.innerHTML = '';
  }

  /**
   * Calculate the top position which depends on the tooltip suggestions height
   * and the terminal text-input height.
   */
  private calculateTopPosition(): number {
    const terminalInputEl = this.$parent.$refs['terminal-input'] as HTMLDivElement;
    const suggestionsRulerEl = this.$refs['suggestions-ruler'] as HTMLDivElement;

    const noSuggestionsHeight = this.suggestions.length ? 0 : 16;

    suggestionsRulerEl.innerHTML = '';

    // Simulate suggestions with the same classes as in the real autocomplete
    this.suggestions.forEach((suggestion) => {
      const node = document.createElement('p');

      node.classList.add('px-2', 'py-1');
      node.textContent = suggestion;

      suggestionsRulerEl.appendChild(node);
    });

    return suggestionsRulerEl.offsetHeight + terminalInputEl.offsetHeight + noSuggestionsHeight;
  }

  /**
   * Calculate the width of the text inside the terminal text-input using the
   * ruler element. Make sure to calculate the length up to the cursor
   * position.
   */
  private calculateTextInputLength(): number {
    const terminalInputEl = this.$parent.$refs['terminal-input'] as HTMLDivElement;
    const textInputRulerEl = this.$refs['text-input-ruler'] as HTMLSpanElement;
    const { cursorPosition } = this.commands;

    textInputRulerEl.innerText = terminalInputEl.innerText.substr(0, cursorPosition);

    return textInputRulerEl.offsetWidth;
  }

  /**
   * Calculate the left position of the tooltip which depends on the terminal
   * name width, the width of the text inside the terminal text-input and the
   * width of the autocomplete element.
   */
  private calculateLeftPosition(): number {
    const terminalNameEl = this.$parent.$refs['terminal-name'] as HTMLSpanElement;
    const terminalInputEl = this.$parent.$refs['terminal-input'] as HTMLDivElement;
    const autocompleteEl = this.$refs.tooltip as HTMLDivElement;

    const terminalNameWidth = terminalNameEl.offsetWidth + 24;
    const terminalTextWidth = this.calculateTextInputLength();
    const autocompleteWidth = autocompleteEl.offsetWidth;

    return terminalNameWidth + terminalTextWidth - autocompleteWidth / 2;
  }

  /**
   * Retrieve all suggestions and display the autocomplete tooltip.
   * Need to pass everything in the `$nextTick` as Vue need to render the
   * `suggestions` array into the component template.
   */
  private async showAutocomplete(): Promise<void> {
    this.setSuggestions();

    // Wait for Vue to render the autocomplete template with suggestions, then
    // it will call the `$nextTick` function with our callback.
    await this.$nextTick(() => {
      const parent = this.$parent;
      const autocompleteEl = this.$refs.tooltip as HTMLDivElement;

      autocompleteEl.style.transition = 'all 0s ease-in-out';
      autocompleteEl.style.left = `${this.calculateLeftPosition()}px`;
      autocompleteEl.style.top = `-${this.calculateTopPosition()}px`;

      autocompleteEl.style.transition = 'all 0.25s ease-in-out';
      autocompleteEl.style.transform = 'translateY(6px)';
      autocompleteEl.style.pointerEvents = 'auto';
      autocompleteEl.style.opacity = '1';

      this.clearRulers();
    });
  }

  /**
   * Hide the autocomplete tooltip.
   */
  private hideAutocomplete(): void {
    const autocompleteEl = this.$refs.tooltip as HTMLDivElement;

    autocompleteEl.style.transform = 'translateY(-6px)';
    autocompleteEl.style.pointerEvents = 'none';
    autocompleteEl.style.opacity = '0';

    this.$store.commit(commandMutations.resetSuggestionIndex);
  }
}
</script>

<style scoped>
#tooltip:after {
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

.transition {
  transition: all 0.25s ease-in-out;
}
</style>
