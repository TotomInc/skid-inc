import { Command } from '@/models/command.model';

export interface CommandState {
  commands: Command[];
  logs: string[];
  history: string[];
  historyIndex: number;
}

const state: CommandState = {
  commands: [],
  logs: [],
  history: [],
  historyIndex: -1,
};

export default state;
