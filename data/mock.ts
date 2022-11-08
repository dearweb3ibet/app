export const accounts = [
  {
    avatar:
      "https://i.pinimg.com/736x/93/96/39/939639532ae4e49a416ea138837ea752.jpg",
    address: "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1",
    bio: "Alice, crypto enthusiast & investor",
    links: {
      twitter: "https://twitter.com/",
      telegram: "https://t.me/",
      instagram: "https://www.instagram.com/",
    },
    bets: [
      {
        id: 1,
        symbol: "ETHUSD",
        minPrice: 1300,
        maxPrice: 1500,
        dayStartTimestamp: 1669852800,
      },
      {
        id: 2,
        symbol: "BTCUSD",
        minPrice: 30000,
        maxPrice: 35000,
        dayStartTimestamp: 1671062400,
      },
      {
        id: 3,
        symbol: "FILUSD",
        minPrice: 100,
        maxPrice: 150,
        dayStartTimestamp: 1671062400,
      },
    ],
  },
  {
    avatar:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1a8a9b138344219.621bda2347cfd.jpg",
    address: "0x3F121f9a16bd6C83D325985417aDA3FE0f517B7D",
    bio: "Bob, skeptic",
    links: {
      twitter: "https://twitter.com/",
    },
  },
];

export const ethChartData = [
  { x: 7, y: 1700, r: 12 },
  { x: 14, y: 1600, r: 9 },
  { x: 14, y: 2200, r: 15 },
  { x: 28, y: 2800, r: 18 },
  { x: 28, y: 1600, r: 28 },
  { x: 56, y: 3200, r: 32 },
  { x: 56, y: 4800, r: 14 },
];

export const ethLastBets = [
  {
    id: 1,
    symbol: "ETHUSD",
    minPrice: 1300,
    maxPrice: 1500,
    dayStartTimestamp: 1669852800,
  },
  {
    id: 2,
    symbol: "ETHUSD",
    minPrice: 1800,
    maxPrice: 3000,
    dayStartTimestamp: 1671062400,
  },
];

export const winningSize = 0.32;
export const winningDistributeDate = 1669852800;

export const topAccounts = [
  { address: "0x6e685a45db4d97ba160fa067cb81b40dfed47245", wins: 19 },
  { address: "0xd5c08681719445a5fdce2bda98b341a49050d821", wins: 17 },
  { address: "0x06959153b974d0d5fdfd87d561db6d8d4fa0bb0b", wins: 8 },
  { address: "0x916ed5586bb328e0ec1a428af060dc3d10919d84", wins: 7 },
  { address: "0x57571d366a00b3389b0adf30a114bc7da7a11580", wins: 5 },
  { address: "0x6e685a45db4d97ba160fa067cb81b40dfed47245", wins: 3 },
  { address: "0xd5c08681719445a5fdce2bda98b341a49050d821", wins: 3 },
  { address: "0x06959153b974d0d5fdfd87d561db6d8d4fa0bb0b", wins: 2 },
  { address: "0x916ed5586bb328e0ec1a428af060dc3d10919d84", wins: 1 },
  { address: "0x57571d366a00b3389b0adf30a114bc7da7a11580", wins: 1 },
];
