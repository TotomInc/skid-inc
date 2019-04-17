import { CommandState } from './command/command.state';
import { ScriptState } from './script/script.state';

export interface RootState {
  commands: CommandState;
  scripts: ScriptState;
}
