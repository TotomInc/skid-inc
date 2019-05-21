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
          :class="{ 'bg-gray-200': commands.suggestionIndex === index }"
          class="transition px-2 py-1 rounded text-base"
        >
          {{ suggestion }}
        </p>
      </div>

      <span v-else class="text-base">No suggestions</span>
    </div>

    <!--
      Thoses are fake elements, theyr are needed to calculate both the width of
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
      if (type === commandMutations.toggleAutocompletion) {
        if (this.commands.isInAutocomplete) {
          this.showAutocomplete();
        } else {
          this.hideAutocomplete();
        }
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
    const inputTextSplitted = this.commands.inputContent.split('');
    const selectedSuggestion = this.commands.suggestions[this.commands.suggestionIndex];
    const { cursorPosition } = this.commands;

    let startingSuggestionIndex = 0;
    let suggestionStrPos = 0;
    let wrote = '';

    // Find a serie of matching characters in order to retrieve what characters
    // have been already written and find the written character-index in the
    // full input text
    inputTextSplitted.forEach((str, i) => {
      if (str === selectedSuggestion[suggestionStrPos]) {
        wrote += str;
        startingSuggestionIndex = i - wrote.length;
        suggestionStrPos += 1;
      }
    });

    // String substitution between written characters and the suggestion
    const toAdd = selectedSuggestion.replace(wrote, '').split('');

    // Add the characters from the `toAdd` array
    inputTextSplitted.splice(cursorPosition, 0, ...toAdd);

    const inputText = inputTextSplitted.join('');
    const newCursorPosition = suggestionStrPos + toAdd.length;

    terminalInputComponent.updateInput(inputText, newCursorPosition);
    this.$store.commit(commandMutations.setInputContent, inputText);
    this.hideAutocomplete();
  }

  /**
   * Call the `autocomplete` function from the command-parser to retrieve and
   * store an array of all suggestions (both in the component and store).
   */
  private setSuggestions(): string[] {
    const suggestions = autocomplete<Command>(this.commands.inputContent, this.commands.commands);

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
   * ruler element.
   */
  private calculateTextInputLength(): number {
    const terminalInputEl = this.$parent.$refs['terminal-input'] as HTMLDivElement;
    const textInputRulerEl = this.$refs['text-input-ruler'] as HTMLSpanElement;

    textInputRulerEl.innerText = terminalInputEl.innerText;

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
