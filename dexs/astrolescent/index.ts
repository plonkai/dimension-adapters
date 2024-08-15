import { FetchResultFees, FetchResultVolume, SimpleAdapter } from "../../adapters/types"
import { CHAIN } from "../../helpers/chains"
import fetchURL from "../../utils/fetchURL"

interface AstrolescentStats {
  volumeUSD:	number;
}
const fetchVolume = async (timestamp: number): Promise<FetchResultVolume> => {
  const response: AstrolescentStats = (await fetchURL(`https://api.astrolescent.com/stats/history?timestamp=${timestamp}`));
  const dailyVolume = Number(response?.volumeUSD);

  return {
    dailyVolume,
    timestamp
  }
}

const adapters: SimpleAdapter = {
  adapter: {
    [CHAIN.RADIXDLT]: {
      fetch: fetchVolume,
      start: 1698624000,
      runAtCurrTime: false
    }
  }
}
export default adapters;
