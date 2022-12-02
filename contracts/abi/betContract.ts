export const betContractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "betCheckerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "contestAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "contestFeePercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "createdTimestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creatorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "creatorFee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "int256",
            name: "targetMinPrice",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "targetMaxPrice",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "targetTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "participationDeadlineTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeForSuccess",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeForFailure",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isClosed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSuccessful",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct Bet.Params",
        name: "params",
        type: "tuple",
      },
    ],
    name: "ParamsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "addedTimestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "accountAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isFeeForSuccess",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "winning",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Bet.Participant",
        name: "participant",
        type: "tuple",
      },
    ],
    name: "ParticipantSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "URISet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "close",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "int256",
        name: "targetMinPrice",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "targetMaxPrice",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "targetTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "participationDeadlineTimestamp",
        type: "uint256",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetCheckerAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "feedSymbol",
        type: "string",
      },
    ],
    name: "getBetCheckerFeedAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContestAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContestFeePercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getParams",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "createdTimestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creatorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "creatorFee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "int256",
            name: "targetMinPrice",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "targetMaxPrice",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "targetTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "participationDeadlineTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeForSuccess",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeForFailure",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isClosed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSuccessful",
            type: "bool",
          },
        ],
        internalType: "struct Bet.Params",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getParticipants",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "addedTimestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "accountAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isFeeForSuccess",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "winning",
            type: "uint256",
          },
        ],
        internalType: "struct Bet.Participant[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "betCheckerAddress",
        type: "address",
      },
    ],
    name: "setBetCheckerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contestAddress",
        type: "address",
      },
    ],
    name: "setContestAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contestFeePercent",
        type: "uint256",
      },
    ],
    name: "setContestFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isFeeForSuccess",
        type: "bool",
      },
    ],
    name: "takePart",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
