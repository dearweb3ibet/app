export default interface ContestWaveParticipant {
  readonly id: string;
  readonly accountAddress: string;
  readonly successes: string;
  readonly failures: string;
  readonly variance: string;
}
