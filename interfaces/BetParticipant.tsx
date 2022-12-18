import Bet from "./Bet";

export default interface BetParticipant {
  readonly id: string;
  readonly bet: Bet;
  readonly addedTimestamp: string;
  readonly accountAddress: string;
  readonly fee: string;
  readonly isCreator: boolean;
  readonly isFeeForSuccess: boolean;
  readonly winning: string;
}
