import { chainlinkPriceFeedContract } from "constants/contract";
import { BigNumber, ethers } from "ethers";

/**
 * Convert "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1" to "0x430...c4b1".
 */
export function addressToShortAddress(address: string): string {
  let shortAddress = address;
  if (address?.length > 10) {
    shortAddress = `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  }
  return shortAddress?.toLowerCase();
}

/**
 * Convert "BTCUSD" to "BTC".
 */
export function symbolToShortSymbol(symbol: string): string {
  return symbol.replace("USD", "");
}

/**
 * Convert error object to pretty string.
 */
export function errorToString(error: any): string {
  let errorString = JSON.stringify(error);
  if (error?.message) {
    errorString = error.message;
  }
  if (error?.error?.data?.message) {
    errorString = error.error.data.message.replace("execution reverted: ", "");
  }
  return errorString;
}

/**
 * Convert target price number from "1200" to big number "120000000000".
 */
export function targetPriceNumberToBigNumber(targetPrice?: number): BigNumber {
  if (!targetPrice) {
    return ethers.constants.Zero;
  }
  const multiplier = 10 ** chainlinkPriceFeedContract.decimals;
  return BigNumber.from(targetPrice * multiplier);
}

/**
 * Convert target price big number from "120000000000" to number "1200".
 */
export function targetPriceBigNumberToNumber(targetPrice?: BigNumber): number {
  if (!targetPrice) {
    return 0;
  }
  const divider = 10 ** chainlinkPriceFeedContract.decimals;
  return targetPrice.toNumber() / divider;
}

/**
 * Convert target price string of big number from "120000000000" to number "1200".
 */
export function targetPriceBigNumberStringToNumber(
  targetPrice?: string
): number {
  if (!targetPrice) {
    return 0;
  }
  return targetPriceBigNumberToNumber(BigNumber.from(targetPrice));
}
