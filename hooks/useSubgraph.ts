import axios from "axios";

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  let findBets = async function (
    firstMember?: string,
    first?: number,
    skip?: number
  ) {
    const response = await makeSubgraphQuery(
      getFindBetsQuery(firstMember, first, skip)
    );
    return response.bets;
  };

  let findContestWaveParticipants = async function (
    contestAddress: string,
    waveIndex: number,
    first?: number,
    skip?: number
  ) {
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

  return { findBets, findContestWaveParticipants };
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
