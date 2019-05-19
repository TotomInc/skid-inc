import { ActionTree } from 'vuex';
import parse, { ParsedArgument } from '@totominc/command-parser';

import generateHelp from '@/utils/generate-help';
import Command from '@/models/command.model';
import { commandActions as cmdActions } from '@/const/commands';
import { RootState } from '../state';
import { CommandState } from './command.state';
import { commandMutations } from './command.mutations';
import { playerMutations } from '../player/player.mutations';

export const commandActions = {
  ...cmdActions,
  PARSE_COMMAND: 'parseCommand',
};

const actions: ActionTree<CommandState, RootState> = {
  async [commandActions.PARSE_COMMAND](context, payload: string) {
    const { command, parsedArgs, valid } = parse<Command>(payload, context.state.commands);

    context.commit(commandMutations.addLog, `> ${payload}`);
    context.commit(commandMutations.addCommand, payload);

    if (!command) {
      const errorLog = `<b>${payload}</b> is not a valid command`;

      context.commit(commandMutations.addLog, errorLog);
    } else if (!valid) {
      const errorLog = `<b>${payload}</b> contains an invalid argument or value`;

      context.dispatch(command.failedAction, { command, parsedArgs });
      context.commit(commandMutations.addLog, errorLog);
    } else {
      context.dispatch(command.successAction, { command, parsedArgs });
    }
  },

  async [commandActions.HELP.SUCCESS](context) {
    const helpLog = generateHelp(context.state.commands);

    context.commit(commandMutations.addLog, helpLog);
  },

  async [commandActions.CLEAR](context) {
    context.commit(commandMutations.removeLogs);
  },

  async [commandActions.USERNAME.SUCCESS](context, payload: { command: Command; parsedArgs: ParsedArgument[] }) {
    const username = payload.parsedArgs[0].value;

    context.commit(playerMutations.editUsername, username);
    context.commit(commandMutations.addLog, `username successfully changed to <b>${username}</b>`);
  },
};

export default actions;
