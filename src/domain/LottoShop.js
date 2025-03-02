import { getRandomNumber } from "../utils/random.js";
import { Lotto } from "./Lotto.js";
import { LottoNumber } from "./LottoNumber.js";

const LottoShop = {
  checkAndAddLottoNumbers: (store, number) => {
    if (store.has(number)) return;
    store.add(number);
  },

  issueLottoNumbers: () => {
    const randomNumberStore = new Set();
    while (randomNumberStore.size < Lotto.CONSTRAINTS.COUNT) {
      const number = getRandomNumber(
        LottoNumber.CONSTRAINTS.MIN,
        LottoNumber.CONSTRAINTS.MAX
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
