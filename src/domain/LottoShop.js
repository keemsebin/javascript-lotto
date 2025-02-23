import { getRandomNumber } from "../utils/random.js";
import Lotto, { LOTTO_NUMBER } from "./Lotto.js";

const LottoShop = {
  checkAndAddLottoNumbers: (store, number) => {
    if (store.has(number)) return;
    store.add(number);
  },

  issueLottoNumbers: () => {
    const randomNumberStore = new Set();
    while (randomNumberStore.size < LOTTO_NUMBER.LENGTH) {
      const number = getRandomNumber(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX);
      LottoShop.checkAndAddLottoNumbers(randomNumberStore, number);
    }
    return new Lotto([...randomNumberStore]);
  },

  createLottos: (count) => {
    return Array.from({ length: count }, () => LottoShop.issueLottoNumbers());
  },
};

export default LottoShop;
