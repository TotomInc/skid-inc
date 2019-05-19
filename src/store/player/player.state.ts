import Player from '@/models/player.model';

export interface PlayerState {
  player: Player;
}

const state: PlayerState = {
  player: {
    money: 0,
    totalMoney: 0,
    experience: 0,
    totalExperience: 0,
    experienceRequired: 100,
    level: 1,
    botnet: 0,
    username: 'script-kiddie',
  },
};

export default state;
