export default interface Bet {
  readonly id: string;
  readonly createdTimestamp: string;
  readonly creatorAddress: string;
  readonly creatorFee: string;
  readonly symbol: string;
  readonly targetMinPrice: string;
  readonly targetMaxPrice: string;
  readonly targetTimestamp: string;
  readonly participationDeadlineTimestamp: string;
  readonly feeForSuccess: string;
  readonly feeForFailure: string;
  readonly isClosed: boolean;
  readonly isSuccessful: boolean;
  readonly participantsNumber: number;
}
