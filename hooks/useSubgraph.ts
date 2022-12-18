import axios from "axios";
import Bet from "interfaces/Bet";
import BetParticipant from "interfaces/BetParticipant";

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  const defaultFirst = 10;
  const defaultSkip = 0;

  let findBets = async function (
    first = defaultFirst,
    skip = defaultSkip
  ): Promise<Array<Bet>> {
    // Prepare query
    const sortParams = `orderBy: createdTimestamp, orderDirection: desc`;
    const paginationParams = `first: ${first}, skip: ${skip}`;
    const query = `{
      bets(${sortParams}, ${paginationParams}) {
        id
        createdTimestamp
        creatorAddress
        creatorFee
        symbol
        targetMinPrice
        targetMaxPrice
        targetTimestamp
        participationDeadlineTimestamp
        feeForSuccess
        feeForFailure
        isClosed
        isSuccessful
        participantsNumber
      }
    }`;
    // Make query and return result
    const response = await makeSubgraphQuery(query);
    const bets: Array<Bet> = [];
    response.bets?.forEach((bet: any) => {
      bets.push({
        id: bet.id,
        createdTimestamp: bet.createdTimestamp,
        creatorAddress: bet.creatorAddress,
        creatorFee: bet.creatorFee,
        symbol: bet.symbol,
        targetMinPrice: bet.targetMinPrice,
        targetMaxPrice: bet.targetMaxPrice,
        targetTimestamp: bet.targetTimestamp,
        participationDeadlineTimestamp: bet.participationDeadlineTimestamp,
        feeForSuccess: bet.feeForSuccess,
        feeForFailure: bet.feeForFailure,
        isClosed: bet.isClosed,
        isSuccessful: bet.isSuccessful,
        participantsNumber: bet.participantsNumber,
      });
    });
    return bets;
  };

  let findBetParticipants = async function (
    accountAddress?: string,
    isCreator?: boolean,
    isFeeForSuccess?: boolean,
    first = defaultFirst,
    skip = defaultSkip
  ): Promise<Array<BetParticipant>> {
    // Prepare query
    const accountAddressFilter = accountAddress
      ? `accountAddress: "${accountAddress.toLowerCase()}"`
      : "";
    const isCreatorFilter =
      isCreator !== undefined ? `isCreator: ${isCreator}` : "";
    const isFeeForSuccessFilter =
      isFeeForSuccess !== undefined
        ? `isFeeForSuccess: ${isFeeForSuccess}`
        : "";
    const filterParams = `where: {${accountAddressFilter}, ${isCreatorFilter}, ${isFeeForSuccessFilter}}`;
    const sortParams = `orderBy: addedTimestamp, orderDirection: desc`;
    const paginationParams = `first: ${first}, skip: ${skip}`;
    const query = `{
      betParticipants(${filterParams}, ${sortParams}, ${paginationParams}) {
        id
        bet {
          id
          creatorAddress
          symbol
          targetMinPrice
          targetMaxPrice
          targetTimestamp
          feeForSuccess
          feeForFailure
          isClosed
          isSuccessful
          participantsNumber
        }
      }
    }`;
    // Make query and return result
    const response = await makeSubgraphQuery(query);
    const betParticipants: Array<BetParticipant> = [];
    response.betParticipants?.forEach((betParticipant: any) => {
      betParticipants.push({
        id: betParticipant.id,
        bet: {
          id: betParticipant.bet.id,
          createdTimestamp: betParticipant.bet.createdTimestamp,
          creatorAddress: betParticipant.bet.creatorAddress,
          creatorFee: betParticipant.bet.creatorFee,
          symbol: betParticipant.bet.symbol,
          targetMinPrice: betParticipant.bet.targetMinPrice,
          targetMaxPrice: betParticipant.bet.targetMaxPrice,
          targetTimestamp: betParticipant.bet.targetTimestamp,
          participationDeadlineTimestamp:
            betParticipant.bet.participationDeadlineTimestamp,
          feeForSuccess: betParticipant.bet.feeForSuccess,
          feeForFailure: betParticipant.bet.feeForFailure,
          isClosed: betParticipant.bet.isClosed,
          isSuccessful: betParticipant.bet.isSuccessful,
          participantsNumber: betParticipant.bet.participantsNumber,
        },
        addedTimestamp: betParticipant.addedTimestamp,
        accountAddress: betParticipant.accountAddress,
        fee: betParticipant.fee,
        isCreator: betParticipant.isCreator,
        isFeeForSuccess: betParticipant.isFeeForSuccess,
        winning: betParticipant.winning,
      });
    });
    return betParticipants;
  };

  // TODO: Use interface instead of "any" for return values
  let findContestWaveParticipants = async function (
    contestAddress: string,
    waveIndex: number,
    first = defaultFirst,
    skip = defaultSkip
  ): Promise<Array<any>> {
    // Filters and params
    const waveFilter = `wave: "${contestAddress.toLowerCase()}_${waveIndex}"`;
    const filterParams = `where: {${waveFilter}}`;
    const sortParams = `orderBy: variance, orderDirection: desc`;
    const paginationParams = `first: ${first}, skip: ${skip}`;
    // Query
    const query = `{
      contestWaveParticipants(${filterParams}, ${sortParams}, ${paginationParams}) {
        id
        accountAddress
        successes
        failures
        variance
      }
    }`;
    // Make query and return result
    const response = await makeSubgraphQuery(query);
    return response.contestWaveParticipants;
  };

  return { findBets, findBetParticipants, findContestWaveParticipants };
}

async function makeSubgraphQuery(query: string) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SUBGRAPH_API || "",
      {
        query: query,
      }
    );
    if (response.data.errors) {
      throw new Error(
        `error making subgraph query: ${JSON.stringify(response.data.errors)}`
      );
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      `could not query the subgraph: ${JSON.stringify(error.message)}`
    );
  }
}
