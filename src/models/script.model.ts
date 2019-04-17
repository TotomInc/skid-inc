export interface Script {
  /** Name of the script */
  name: string;
  /** Price to unlock the script */
  unlockPrice: number;
  /** Base price to levelup the script */
  price: number;
  /** Inflation of the levelup price */
  inflation: number;
  /** Script duration in seconds */
  duration: number;
  /** Time elasped of the script in seconds */
  progression: number;
  /** Level of the script, level 1 by default */
  level: number;
  /** If the script have been unlocked */
  unlocked: boolean;
  /** Is the script running */
  triggered: boolean;
  /** Number of times the script have been executed */
  executed: number;
  /** Multiple income possible of a single script (money, exp, ...) */
  income: ScriptIncome;
}

export interface ScriptIncome {
  money: number;
  exp: number;
}
