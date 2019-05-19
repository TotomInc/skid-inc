import { Command } from '@/models/command.model';

/**
 * List of actions for the commands to use with Vuex and the `commands` Vuex
 * module.
 */
export const commandActions = {
  HELP: {
    SUCCESS: 'commandHelpSuccess',
    FAILED: 'commandHelpFailed',
  },

  USERNAME: {
    SUCCESS: 'commandUsernameSuccess',
    FAILED: 'commandUsernameFailed',
  },

  CLEAR: 'commandClear',
};

/**
 * Default state of the `commands` Vuex module.
 */
export const commands: Command[] = [
  {
    name: 'help',
    description: 'display a list of all available commands',
    successAction: commandActions.HELP.SUCCESS,
    failedAction: commandActions.HELP.FAILED,
    requireValue: false,
  },
  {
    name: 'clear',
    description: 'clear logs from the terminal',
    successAction: commandActions.CLEAR,
    failedAction: commandActions.CLEAR,
    requireValue: false,
  },
  {
    name: 'username',
    description: 'change your username',
    successAction: commandActions.USERNAME.SUCCESS,
    failedAction: commandActions.USERNAME.FAILED,
    requireValue: true,
    validation: (value) => typeof value === 'string' && !value.startsWith('-'),
  },
];
