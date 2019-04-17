import { Command } from '@/models/command.model';

export interface CommandState {
  commands: Command[];
  logs: string[];
  history: string[];
  historyIndex: number;
}

const state: CommandState = {
  commands: [
    {
      name: 'help',
      description: 'display a list of all available commands',
      successAction: 'COMMAND_HELP_SUCCESS',
      failedAction: 'COMMAND_HELP_FAILED',
      requireValue: false,
    },
  ],
  logs: [],
  history: [],
  historyIndex: -1,
};

export default state;
