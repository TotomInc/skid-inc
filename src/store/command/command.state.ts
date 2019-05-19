import Command from '@/models/command.model';
import { commands } from '@/const/commands';

export interface CommandState {
  commands: Command[];
  logs: string[];
  history: string[];
  suggestions: string[];
  historyIndex: number;
  inputContent: string;
  isInAutocomplete: boolean;
  suggestionIndex: number;
}

const state: CommandState = {
  commands,
  logs: [],
  history: [],
  suggestions: [],
  historyIndex: -1,
  inputContent: '',
  isInAutocomplete: false,
  suggestionIndex: 0,
};

export default state;
