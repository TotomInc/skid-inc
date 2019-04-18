export interface Player {
  /** Player money */
  money: number;
  /** Player total money, stack after each prestige */
  totalMoney: number;
  /** Player experience */
  experience: number;
  /** Player total experience, stack after each prestige */
  totalExperience: number;
  /** Exp required */
  experienceRequired: number;
  /** Player level */
  level: number;
  /** Botnet network amount */
  botnet: number;
  /** Player username */
  username: string;
}
