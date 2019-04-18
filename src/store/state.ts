import { CommandState } from './command/command.state';
import { ScriptState } from './script/script.state';
import { PlayerState } from './player/player.state';

export interface RootState {
  commands: CommandState;
  scripts: ScriptState;
  player: PlayerState;
}
