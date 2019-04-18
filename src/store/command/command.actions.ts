import { ActionTree } from 'vuex';
import parse, { ParsedArgument } from '@totominc/command-parser';

import { Command } from '@/models/command.model';
import { RootState } from '../state';
import { CommandState } from './command.state';
import { commandMutations } from './command.mutations';

export const commandActions = {
  PARSE_COMMAND: 'parseCommand',
  PARSE_COMMAND_FAILED: 'parseCommandFailed',
};

const actions: ActionTree<CommandState, RootState> = {
  async [commandActions.PARSE_COMMAND](context, payload: string) {
    const { command, parsedArgs, valid } = parse<Command>(payload, context.state.commands);

    context.commit(commandMutations.addLog, `> ${payload}`);
    context.commit(commandMutations.addCommand, payload);

    if (!command) {
      context.dispatch(commandActions.PARSE_COMMAND_FAILED, {
        parsedArgs,
        input: payload,
      });
    } else if (!valid) {
      context.dispatch(command.failedAction, { command, parsedArgs });
    } else {
      context.dispatch(command.successAction, { command, parsedArgs });
    }
  },

  async [commandActions.PARSE_COMMAND_FAILED](context, payload: { input: string; parsedArgs: ParsedArgument[] }) {
    context.commit(commandMutations.addLog, `execute user input failed: ${payload.input}`);
  },
};

export default actions;
