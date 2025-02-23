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
    return [...randomNumberStore];
  },

  createLottos: (count) => {
    return Array.from({ length: count }, () => {
      const lottoNumbers = LottoShop.issueLottoNumbers();
      return new Lotto(lottoNumbers);
    });
  },
};

export default LottoShop;
