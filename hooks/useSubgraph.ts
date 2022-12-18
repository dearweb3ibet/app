import axios from "axios";

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  // TODO: Make next function relevant to current subgraph structure
  let findBets = async function (
    firstMember?: string,
    first?: number,
    skip?: number
  ): Promise<Array<any>> {
    const response = await makeSubgraphQuery(
      getFindBetsQuery(firstMember, first, skip)
    );
    return response.bets;
  };

  let findBetParticipants = async function (
    accountAddress?: string,
    isCreator?: boolean,
    isFeeForSuccess?: boolean,
    first?: number,
    skip?: number
  ): Promise<Array<any>> {
    const response = await makeSubgraphQuery(
      getFindBetParticipantsQuery(
        accountAddress,
        isCreator,
        isFeeForSuccess,
        first,
        skip
      )
    );
    return response.betParticipants;
  };

  let findContestWaveParticipants = async function (
    contestAddress: string,
    waveIndex: number,
    first?: number,
    skip?: number
  ): Promise<Array<any>> {
    const response = await makeSubgraphQuery(
      getFindContestWaveParticipantsQuery(
        contestAddress,
        waveIndex,
        first,
        skip
      )
    );
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

function getFindBetsQuery(firstMember?: string, first?: number, skip?: number) {
  let firstMemberFilter = firstMember
    ? `firstMember: "${firstMember.toLowerCase()}"`
    : "";
  let filterParams = `where: {${firstMemberFilter}}`;
  let sortParams = `orderBy: createdDate, orderDirection: desc`;
  let paginationParams = `first: ${first || 10}, skip: ${skip || 0}`;
  return `{
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
}

function getFindBetParticipantsQuery(
  accountAddress?: string,
  isCreator?: boolean,
  isFeeForSuccess?: boolean,
  first?: number,
  skip?: number
) {
  let accountAddressFilter = accountAddress
    ? `accountAddress: "${accountAddress.toLowerCase()}"`
    : "";
  let isCreatorFilter =
    isCreator !== undefined ? `isCreator: ${isCreator}` : "";
  let isFeeForSuccessFilter =
    isFeeForSuccess !== undefined ? `isFeeForSuccess: ${isFeeForSuccess}` : "";
  let filterParams = `where: {${accountAddressFilter}, ${isCreatorFilter}, ${isFeeForSuccessFilter}}`;
  let sortParams = `orderBy: addedTimestamp, orderDirection: desc`;
  let paginationParams = `first: ${first || 10}, skip: ${skip || 0}`;
  return `{
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
}

function getFindContestWaveParticipantsQuery(
  contestAddress: string,
  waveIndex: number,
  first?: number,
  skip?: number
) {
  let waveFilter = `wave: "${contestAddress.toLowerCase()}_${waveIndex}"`;
  let filterParams = `where: {${waveFilter}}`;
  let sortParams = `orderBy: variance, orderDirection: desc`;
  let paginationParams = `first: ${first || 10}, skip: ${skip || 0}`;
  return `{
    contestWaveParticipants(${filterParams}, ${sortParams}, ${paginationParams}) {
      id
      accountAddress
      successes
      failures
      variance
    }
  }`;
}
