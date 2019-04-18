import { Command } from '@/models/command.model';
import { commandActions } from './command.actions';

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
      successAction: commandActions.COMMAND_HELP_SUCCESS,
      failedAction: commandActions.COMMAND_HELP_FAILED,
      requireValue: false,
    },
    {
      name: 'clear',
      description: 'clear logs from the terminal',
      successAction: commandActions.COMMAND_CLEAR_SUCCESS,
      failedAction: commandActions.COMMAND_CLEAR_FAILED,
      requireValue: false,
    },
    {
      name: 'username',
      description: 'change your username',
      successAction: commandActions.COMMAND_USERNAME_SUCCESS,
      failedAction: commandActions.COMMAND_USERNAME_FAILED,
      requireValue: true,
      validation: (value) => typeof value === 'string' && !value.startsWith('-'),
    },
  ],
  logs: [],
  history: [],
  historyIndex: -1,
};

export default state;
