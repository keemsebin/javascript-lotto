import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import { LottoNumber } from "./LottoNumber.js";

class Lotto {
  static LOTTO = Object.freeze({ COUNT: 6 });

  #numbers = [];

  constructor(numbers) {
    const lottoNumbers = numbers.map((num) => new LottoNumber(num));
    this.#numbers = this.#sortLottoNumber(lottoNumbers);
    this.#validate(this.#numbers);
  }

  #checkDuplicate(numbers) {
    const values = numbers.map((num) => num.getValue());
    if (new Set(values).size !== values.length) {
      throwError(ERROR.DUPLICATE);
    }
  }

  #checkLength(numbers) {
    if (numbers.length !== this.constructor.LOTTO.COUNT) {
      throwError(ERROR.LENGTH);
    }
  }

  #validate(numbers) {
    this.#checkDuplicate(numbers);
    this.#checkLength(numbers);
  }

  #sortLottoNumber(numbers) {
    return numbers.sort((a, b) => a.getValue() - b.getValue());
  }

  getLottoNumbers() {
    return this.#numbers.map((number) => number.getValue());
  }

  getIncludeSameNumbers(givenLottoNumber) {
    return this.getLottoNumbers().filter((number) =>
      givenLottoNumber.includes(number)
    ).length;
  }
}

export { Lotto };
