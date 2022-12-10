export const contestContractAbi = [
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
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Receiving",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winnersNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winning",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
        ],
        indexed: false,
        internalType: "struct Contest.Wave",
        name: "wave",
        type: "tuple",
      },
    ],
    name: "WaveClose",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winnersNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winning",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
        ],
        indexed: false,
        internalType: "struct Contest.Wave",
        name: "wave",
        type: "tuple",
      },
    ],
    name: "WaveCreate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "participantAccountAddress",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "accountAddress",
            type: "address",
          },
          {
            internalType: "int256",
            name: "successes",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "failures",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "variance",
            type: "int256",
          },
        ],
        indexed: false,
        internalType: "struct Contest.WaveParticipant",
        name: "participant",
        type: "tuple",
      },
    ],
    name: "WaveParticipantSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "winners",
        type: "address[]",
      },
    ],
    name: "closeLastWave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastWave",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winnersNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winning",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
        ],
        internalType: "struct Contest.Wave",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastWaveParticipants",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "accountAddress",
            type: "address",
          },
          {
            internalType: "int256",
            name: "successes",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "failures",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "variance",
            type: "int256",
          },
        ],
        internalType: "struct Contest.WaveParticipant[]",
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
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getWave",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winnersNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "winning",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
        ],
        internalType: "struct Contest.Wave",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "getWaveParticipants",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "accountAddress",
            type: "address",
          },
          {
            internalType: "int256",
            name: "successes",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "failures",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "variance",
            type: "int256",
          },
        ],
        internalType: "struct Contest.WaveParticipant[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWavesNumber",
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
        internalType: "address[]",
        name: "betParticipantAddresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "betParticipantWinnings",
        type: "uint256[]",
      },
    ],
    name: "processBetParticipants",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "endTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "winnersNumber",
        type: "uint256",
      },
    ],
    name: "startWave",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
