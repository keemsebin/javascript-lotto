import { getRandomNumber } from "../utils/random.js";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

const LottoShop = {
  checkAndAddLottoNumbers: (store, number) => {
    if (store.has(number)) return;
    store.add(number);
  },

  issueLottoNumbers: () => {
    const randomNumberStore = new Set();
    while (randomNumberStore.size < LottoNumber.LOTTO_NUMBER.LENGTH) {
      const number = getRandomNumber(
        LottoNumber.LOTTO_NUMBER.MIN,
        LottoNumber.LOTTO_NUMBER.MAX
      );
      LottoShop.checkAndAddLottoNumbers(randomNumberStore, number);
    }
    return new Lotto([...randomNumberStore]);
  },

  createLottos: (count) => {
    return Array.from({ length: count }, () => LottoShop.issueLottoNumbers());
  },
};

export default LottoShop;
