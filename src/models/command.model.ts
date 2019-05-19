import { Command as ParserCommand } from '@totominc/command-parser';

interface Command extends ParserCommand {
  /** Condition to unlock the command */
  unlock?: () => boolean;
  /** Vuex action to emit on user-command success (complete) */
  successAction: string;
  /** Vuex action to emit on user-command failed (invalid) */
  failedAction: string;
}

export default Command;
