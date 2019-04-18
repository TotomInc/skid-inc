import { ActionTree } from 'vuex';
import plur from 'plur';

import { PlayerState } from './player.state';
import { RootState } from '../state';
import { playerMutations } from './player.mutations';
import { commandMutations } from '../command/command.mutations';

export const playerActions = {
  LEVELUP: 'levelup',
  EARN_EXPERIENCE: 'earnExperience',
};

const actions: ActionTree<PlayerState, RootState> = {
  [playerActions.LEVELUP](context) {
    let levels = 0;

    while (context.state.player.experience >= context.state.player.experienceRequired) {
      context.commit(playerMutations.addLevel);
      context.commit(playerMutations.setExperienceRequired);
      context.commit(playerMutations.removeExperience, context.state.player.experienceRequired);

      levels += 1;
    }

    if (levels) {
      const log = `You gained ${levels} ${plur('level', levels)}!`;

      context.dispatch(commandMutations.addLog, log);
    }
  },

  /**
   * An action is required to earn experience, since it needs to check for a
   * potential levelup after mutating the amount of experience.
   */
  [playerActions.EARN_EXPERIENCE](context, payload: number) {
    context.commit(playerMutations.addExperience, payload);
    context.dispatch(playerActions.LEVELUP);
  },
};

export default actions;
