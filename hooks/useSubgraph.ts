import axios from "axios";

/**
 * Hook to work with subgraph.
 *
 * TODO: Use types for values, that functions return
 */
export default function useSubgraph() {
  // TODO: Make next function relevant to current subgraph structure
  let findBets = async function (
    firstMember?: string,
    first?: number,
    skip?: number
  ): Promise<Array<any>> {
    // Filters and params
    const firstMemberFilter = firstMember
      ? `firstMember: "${firstMember.toLowerCase()}"`
      : "";
    const filterParams = `where: {${firstMemberFilter}}`;
    const sortParams = `orderBy: createdDate, orderDirection: desc`;
    const paginationParams = `first: ${first || 10}, skip: ${skip || 0}`;
    // Query
    const query = `{
      bets(${filterParams}, ${sortParams}, ${paginationParams}) {
        id
        createdDate
        symbol
        minPrice
        maxPrice
        dayStartTimestamp
        rate
        firstMember
        secondMember
        winner
        winning
      }
    }`;
    // Make query and return result
    const response = await makeSubgraphQuery(query);
    return response.bets;
  };

  let findBetParticipants = async function (
    accountAddress?: string,
    isCreator?: boolean,
    isFeeForSuccess?: boolean,
    first?: number,
    skip?: number
  ): Promise<Array<any>> {
    // Filters and params
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
    const paginationParams = `first: ${first || 10}, skip: ${skip || 0}`;
    // Query
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
    return response.betParticipants;
  };

  let findContestWaveParticipants = async function (
    contestAddress: string,
    waveIndex: number,
    first?: number,
    skip?: number
  ): Promise<Array<any>> {
    // Filters and params
    const waveFilter = `wave: "${contestAddress.toLowerCase()}_${waveIndex}"`;
    const filterParams = `where: {${waveFilter}}`;
    const sortParams = `orderBy: variance, orderDirection: desc`;
    const paginationParams = `first: ${first || 10}, skip: ${skip || 0}`;
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
