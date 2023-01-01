import { Web3Storage } from "web3.storage";
import axios from "axios";

/**
 * Hook for work with IPFS.
 */
export default function useIpfs() {
  const ipfsUrlPrefix = "ipfs://";
  const web3Storage = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY || "",
    endpoint: new URL("https://api.web3.storage"),
  });

  let uploadFileToIpfs = async function (file: any) {
    const cid = await web3Storage.put([file], { wrapWithDirectory: false });
    const ipfsUrl = `${ipfsUrlPrefix}${cid}`;
    return { cid, ipfsUrl };
  };

  let uploadJsonToIpfs = async function (json: object) {
    const file = new File([JSON.stringify(json)], "", {
      type: "text/plain",
    });
    const cid = await web3Storage.put([file], { wrapWithDirectory: false });
    const ipfsUrl = `${ipfsUrlPrefix}${cid}`;
    return { cid, ipfsUrl };
  };

  let loadJsonFromIpfs = async function (ipfsUrl: string) {
    const response = await axios.get(ipfsUrlToHttpUrl(ipfsUrl));
    if (response.data.errors) {
      throw new Error(
        `Fail to loading json from IPFS: ${response.data.errors}`
      );
    }
    return response.data;
  };

  let ipfsUrlToHttpUrl = function (ipfsUrl: string): string {
    if (!ipfsUrl || !ipfsUrl.startsWith(ipfsUrlPrefix)) {
      throw new Error(`Fail to converting IPFS URL to HTTP URL: ${ipfsUrl}`);
    }
    return ipfsUrl.replace("ipfs://", "https://w3s.link/ipfs/");
  };

  return {
    uploadFileToIpfs,
    uploadJsonToIpfs,
    loadJsonFromIpfs,
    ipfsUrlToHttpUrl,
  };
}
